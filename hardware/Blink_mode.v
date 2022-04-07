module Blink_mode(
	
	input clk,
	
	//total number of led is 60, total red data bit is 60*8=480
	//[7:0] is the 0 index led, [15:8] is the 1 index led
	input data_ready,
	input [7:0]red_in, 
	input [7:0]green_in, 
	input [7:0]blue_in, 
	input reset,
	input [6:0] start_index,
	
	output reg DO,
	
	output reg finish_currentled, //current led finish
	output reg finish_ledSet //all finish

				);
 	
		
   function integer log2;
      input integer                    value;
      begin
         value = value-1;
         for (log2=0; value>0; log2=log2+1)
           value = value>>1;
      end
   endfunction
	
	   /////////////////////////////////////////////////////////////
   // Timing parameters for the WS2811                        //
   // The LEDs are reset by driving D0 low for at least 50us. //
   // Data is transmitted using a 800kHz signal.              //
   // A '1' is 50% duty cycle, a '0' is 20% duty cycle.       //
   /////////////////////////////////////////////////////////////
   localparam integer CYCLE_COUNT         = 50000000 / 800000;
   localparam integer H0_CYCLE_COUNT      = 0.32 * CYCLE_COUNT;
   localparam integer H1_CYCLE_COUNT      = 0.64 * CYCLE_COUNT;
   localparam integer CLOCK_DIV_WIDTH     = log2(CYCLE_COUNT);
   
   localparam integer RESET_COUNT         = 100 * CYCLE_COUNT;
   localparam integer RESET_COUNTER_WIDTH = log2(RESET_COUNT);

   reg [CLOCK_DIV_WIDTH-1:0]             clock_div;           // Clock divider for a cycle
   reg [RESET_COUNTER_WIDTH-1:0]         reset_counter;       // Counter for a reset cycle
   
   localparam STATE_RESET    = 3'd0;
   localparam STATE_LATCH    = 3'd1;
   localparam STATE_PRE      = 3'd2;
   localparam STATE_TRANSMIT = 3'd3;
   localparam STATE_POST     = 3'd4;
	localparam IDLE   = 3'd5;
	
   reg [2:0]                           state;              // FSM state

   localparam COLOR_G     = 2'd0;
   localparam COLOR_R     = 2'd1;
   localparam COLOR_B     = 2'd2;
	
	
	
   reg [1:0]                           color;              // Current color being transferred
	reg [7:0]                           current_byte;       // Current byte to send
   reg [2:0]                           current_bit;        // Current bit index to send
	
	//the legth defined how many led transfer, initialize the color
	//change it after implement decode
	//reg [7:0] red_data=8'hFF;
	//reg [7:0] green_data=8'h10;
	//reg [7:0] blue_data=8'h00;
	
					
	reg [7:0]  red;
   reg [7:0]  green;
   reg [7:0]  blue;
	
	reg [6:0] index_wirte; //define the index of current led is being write
	
   always @ (posedge clk) begin
	
      if (reset) begin

         state <= STATE_RESET;
         DO <= 0;
         reset_counter <= 0;
         color <= COLOR_G;
         current_bit <= 7;
      end
		
      else begin
		
         case (state)
			
           STATE_RESET: begin
//			  		red_data=8'hFF;
//		green_data=8'h10;
//		blue_data=8'h00;
              // De-assert DO, and wait for 75 us.
				  finish_currentled<=0;
				  finish_ledSet<=0;
              DO <= 0;
				  index_wirte <= start_index;
				  
              if (reset_counter == RESET_COUNT-1) begin
                 reset_counter <= 0;
                 state <= IDLE;
              end
              else begin
                 reset_counter <= reset_counter + 1;
              end
           end 
			  
			//  STATE_DECODE:begin
			  //Here insert a module of decode table ,need decode flag 1 finish, 0 not finish

				    
			//		blue_data<= blue_in+10; // pattern
         //      green_data<= green_in +1; 
				  
			//	   current_bit  <= 7;
              
         //      state <= STATE_LATCH;
			  
			//  end
			IDLE: begin
					
					
					if (data_ready) state <= STATE_LATCH;
					else state <= IDLE;
					
				end
			  
           STATE_LATCH: begin  // Latch the input
			  
			   finish_currentled<=0;
				red <= red_in;
				blue <= blue_in;
				current_byte <= green_in;
			 
				color <= COLOR_G;  // Start sending green
				current_bit <= 7; //transfer from 7 to 0
              
				state <= STATE_PRE;
				end
			  
			  
           STATE_PRE: begin
              // Assert DO, start clock divider counter
              clock_div <= 0;
              DO <= 1;
              state <= STATE_TRANSMIT;
           end
			  
           STATE_TRANSMIT: begin
              // De-assert DO after a certain amount of time, depending on if you're transmitting a 1 or 0.
              if (current_byte[7] == 0 && clock_div >= H0_CYCLE_COUNT) begin
                 DO <= 0;
              end
              else if (current_byte[7] == 1 && clock_div >= H1_CYCLE_COUNT) begin
                 DO <= 0;
              end
              // Advance cycle counter
              if (clock_div == CYCLE_COUNT-1) begin
                 state <= STATE_POST;
              end
              else begin
                 clock_div <= clock_div + 1;
              end
           end
           STATE_POST: begin
              if (current_bit != 0) begin
                 // Start sending next bit of data
                 current_byte <= {current_byte[6:0], 1'b0};
                 case (current_bit)
                    7: current_bit <= 6;
                    6: current_bit <= 5;
                    5: current_bit <= 4;
                    4: current_bit <= 3;
                    3: current_bit <= 2;
                    2: current_bit <= 1;
                    1: current_bit <= 0;
                 endcase
                 state <= STATE_PRE;
              end
              else begin
                 // Advance to the next color. If we were on blue, advance to the next LED
                 case (color)
                    COLOR_G: begin
                       color <= COLOR_R;
                       current_byte <= red;
                       current_bit <= 7;
                       state <= STATE_PRE;
                    end
                   COLOR_R: begin
                      color <= COLOR_B;
                      current_byte <= blue;
                      current_bit <= 7;
                      state <= STATE_PRE;
                   end
                   COLOR_B: begin
						 index_wirte <= index_wirte+1;
						 
						 finish_currentled <= 1; //current led finish
						 
						 if(index_wirte == start_index + 4 ) begin
							finish_ledSet <= 1; //strip finish
							state <= STATE_RESET;
						 end
						 else state <= IDLE;
						 end
						endcase
					end
				end
						 
				

						 
//							if(index_wirte < 1 ) begin //total led num is 60,decode next led
//							 index_wirte <=index_wirte+1;
//							 state <= STATE_LATCH;
//							 end
//							 
//                      else begin
//							   finish_ledSet<=1;
//								state<=STATE_RESET;
//                      end
					
         endcase
      end
   end
   
	
	
	
	
	


endmodule
