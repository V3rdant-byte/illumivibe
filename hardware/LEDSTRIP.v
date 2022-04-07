module LEDSTRIP(input CLOCK_50,
					 input [3:0] KEY,
					 input [9:0] SW,
					 output      [6:0]  HEX0,
								  ///////// HEX1 /////////
					 output      [6:0]  HEX1,

					///////// HEX2 /////////
					 output      [6:0]  HEX2,

					///////// HEX3 /////////
					 output      [6:0]  HEX3,

					///////// HEX4 /////////
					 output      [6:0]  HEX4,

					///////// HEX5 /////////
					 output      [6:0]  HEX5,
					 output [35:0] GPIO_0,
					 inout [35:0] GPIO_1);
					 
					 
	
	wire reset = ~KEY[3];
	
	wire start;
	
	assign GPIO_1[10] = 1;
	assign GPIO_1[1] = ~reset;
	
	
	
	wire [23:0] color_0;
	wire [23:0] color_1;
	wire [23:0] color_2;
	wire [23:0] color_3;
	wire [23:0] color_4;
	wire [23:0] color_5;
	wire [23:0] color_6;
	wire [23:0] color_7;
	wire [23:0] color_8;
	wire [23:0] color_9;
	wire [23:0] color_10;
	wire [23:0] color_11;
	
	reg [23:0] color_0_reg;
	reg [23:0] color_1_reg;
	reg [23:0] color_2_reg;
	reg [23:0] color_3_reg;
	reg [23:0] color_4_reg;
	reg [23:0] color_5_reg;
	reg [23:0] color_6_reg;
	reg [23:0] color_7_reg;
	reg [23:0] color_8_reg;
	reg [23:0] color_9_reg;
	reg [23:0] color_10_reg;
	reg [23:0] color_11_reg;

	SysForLed sfl(.clk_clk(CLOCK_50),       //   clk.clk
		.color_0_export(color_0),
		.color_1_export(color_1),
		.color_2_export(color_2),
		.color_3_export(color_3),
		.color_4_export(color_4),
		.color_5_export(color_5),
		.color_6_export(color_6),
		.color_7_export(color_7),
		.color_8_export(color_8),
		.color_9_export(color_9),
		.color_10_export(color_10),
		.color_11_export(color_11),
		.reset_reset_n(~reset),  // reset.reset_n
		.start_external_connection_export(start),
		.wifi_uart0_external_connection_rxd(GPIO_1[14]),
		.wifi_uart0_external_connection_txd(GPIO_1[15]),
		.wifi_uart0_external_connection_cts_n(GPIO_1[20]),
		.wifi_uart0_external_connection_rts_n(GPIO_1[21])
	);
	
	always@(posedge CLOCK_50) begin
		color_0_reg <= color_0;
		color_1_reg <= color_1;
		color_2_reg <= color_2;
		color_3_reg <= color_3;
		color_4_reg <= color_4;
		color_5_reg <= color_5;
		color_6_reg <= color_6;
		color_7_reg <= color_7;
		color_8_reg <= color_8;
		color_9_reg <= color_9;
		color_10_reg <= color_10;
		color_11_reg <= color_11;
	end
	
	//wire [3:0] state;
	//SevenSegmentDisplayDecoder d0(
	//.ssOut(HEX0),
   //.nIn(state));
	
	reg [4:0] state;
	
	localparam STATE_IDLE = 5'b0;
	localparam STATE_0 = 5'b1;
	localparam STATE_1 = 5'd2;
	localparam STATE_2 = 5'd3;
	localparam STATE_3 = 5'd4;
	localparam STATE_4 = 5'd5;
	localparam STATE_5 = 5'd6;
	localparam STATE_6 = 5'd7;
	localparam STATE_7 = 5'd8;
	localparam STATE_8 = 5'd9;
	localparam STATE_9 = 5'd10;
	localparam STATE_10 = 5'd11;
	localparam STATE_11 = 5'd12;
	
	reg g;
	assign GPIO_0[1] = g;
	wire D_0, D_1, D_2, D_3, D_4, D_5, D_6, D_7, D_8, D_9, D_10, D_11;
	wire start_1, start_2, start_3, start_4, start_5, start_6, start_7, start_8, start_9, start_10, start_11, start_12;
	
	always@(posedge CLOCK_50) begin
		if (reset) state <= STATE_IDLE;
		else begin
			case(state)
				STATE_IDLE: begin
					if (start) state <= STATE_0;
					else state <= STATE_IDLE;
				end
				STATE_0: begin
					g <= D_0;
					if (start_1) state <= STATE_1;
					else state <= STATE_0;
				end
				STATE_1: begin
					g <= D_1;
					if (start_2) state <= STATE_2;
					else state <= STATE_1;
				end
				STATE_2: begin
					g <= D_2;
					if (start_3) state <= STATE_3;
					else state <= STATE_2;
				end
				STATE_3: begin
					g <= D_3;
					if (start_4) state <= STATE_4;
					else state <= STATE_3;
				end
				STATE_4: begin
					g <= D_4;
					if (start_5) state <= STATE_5;
					else state <= STATE_4;
				end
				STATE_5: begin
					g <= D_5;
					if (start_6) state <= STATE_6;
					else state <= STATE_5;
				end
				STATE_6: begin
					g <= D_6;
					if (start_7) state <= STATE_7;
					else state <= STATE_6;
				end
				STATE_7: begin
					g <= D_7;
					if (start_8) state <= STATE_8;
					else state <= STATE_7;
				end
				STATE_8: begin
					g <= D_8;
					if (start_9) state <= STATE_9;
					else state <= STATE_8;
				end
				STATE_9: begin
					g <= D_9;
					if (start_10) state <= STATE_10;
					else state <= STATE_9;
				end
				STATE_10: begin
					g <= D_10;
					if (start_11) state <= STATE_11;
					else state <= STATE_10;
				end
				STATE_11: begin
					g <= D_11;
					if (start_12) state <= STATE_IDLE;
					else state <= STATE_11;
				end
				default: 
					state <= STATE_IDLE;
			endcase
		end
	end

				
	UnitLed ul_0 (.clk(CLOCK_50),
						.reset(reset),
						.start(start),
						.gpio_0(D_0),
						.color(color_0_reg),
						.start_index(7'd0),
						.finish_ledSet(start_1)
					);
	
	UnitLed ul_1 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_1),
						.gpio_0(D_1),
						.color(color_1_reg),
						.start_index(7'd5),
						.finish_ledSet(start_2)
					);
					
					
	UnitLed ul_2 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_2),
						.gpio_0(D_2),
						.color(color_2_reg),
						.start_index(7'd10),
						.finish_ledSet(start_3)
					);
	UnitLed ul_3 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_3),
						.gpio_0(D_3),
						.color(color_3_reg),
						.start_index(7'd15),
						.finish_ledSet(start_4)
					);
	UnitLed ul_4 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_4),
						.gpio_0(D_4),
						.color(color_4_reg),
						.start_index(7'd20),
						.finish_ledSet(start_5)
					);
	UnitLed ul_5 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_5),
						.gpio_0(D_5),
						.color(color_5_reg),
						.start_index(7'd25),
						.finish_ledSet(start_6)
					);
	UnitLed ul_6 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_6),
						.gpio_0(D_6),
						.color(color_6_reg),
						.start_index(7'd30),
						.finish_ledSet(start_7)
					);
	UnitLed ul_7 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_7),
						.gpio_0(D_7),
						.color(color_7_reg),
						.start_index(7'd35),
						.finish_ledSet(start_8)
					);
	UnitLed ul_8 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_8),
						.gpio_0(D_8),
						.color(color_8_reg),
						.start_index(7'd40),
						.finish_ledSet(start_9)
					);
	UnitLed ul_9 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_9),
						.gpio_0(D_9),
						.color(color_9_reg),
						.start_index(7'd45),
						.finish_ledSet(start_10)
					);
	UnitLed ul_10 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_10),
						.gpio_0(D_10),
						.color(color_10_reg),
						.start_index(7'd50),
						.finish_ledSet(start_11)
					);
	UnitLed ul_11 (.clk(CLOCK_50),
						.reset(reset),
						.start(start_11),
						.gpio_0(D_11),
						.color(color_11_reg),
						.start_index(7'd55),
						.finish_ledSet(start_12)
					);
					
					
	
endmodule
