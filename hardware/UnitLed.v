module UnitLed(input clk,
					input reset,
					input start,
					input [23:0] color,
					input [6:0] start_index,
					output gpio_0,
					output finish_ledSet
					);
					
					
	reg data_ready;
	reg [7:0] red_in;
	reg [7:0] green_in;
	reg [7:0] blue_in;
	reg [7:0] counter = 8'd0;
	
	wire finish_currentled;
	
	reg [3:0] state;
	localparam STATE_START = 4'd0;
	localparam STATE_TRANSMIT = 4'd1;
	localparam STATE_WAIT = 4'd2;
	localparam STATE_FINISH = 4'd3;
	localparam STATE_RESET = 4'd5;
	
	Blink_mode bm(.clk(clk),
	.data_ready(data_ready),
	.red_in(red_in), 
	.green_in(green_in), 
	.blue_in(blue_in), 
	.reset(reset),
	.DO(gpio_0),
	.finish_currentled(finish_currentled), //current led finish
	.finish_ledSet(finish_ledSet), //all finish
	.start_index(start_index)
	);
	
	always@(posedge clk) begin
		if (reset) begin
			state <= STATE_RESET;
		end
		else begin
			case(state)
				STATE_RESET: begin
					if (start) state <= STATE_START;
					else begin
					red_in <= color[23:16];
					green_in <= color[15:8];
					blue_in <= color[7:0];
					data_ready <= 1'h0;
					counter <= 8'd0;
					state <= STATE_RESET;
					end
				end
				STATE_START: begin
					data_ready <= 1'h0;
					counter <= 8'd0;
					state <= STATE_TRANSMIT;
					
				end
				STATE_TRANSMIT: begin
					data_ready <= 1'h1;
					state <= STATE_WAIT;
				end
				STATE_WAIT: begin
					if(finish_ledSet) state <= STATE_RESET;
					else if (finish_currentled) begin
					   data_ready <= 1'h0;
						state <= STATE_FINISH;
					end
					else state <= STATE_WAIT;
			   end
				STATE_FINISH: begin
					data_ready <= 1'h0;
					counter <= counter + 8'd1;
					state <= STATE_TRANSMIT;
				end
				default: begin
					state <= STATE_RESET;
				end
			endcase
		end
	end
endmodule
	