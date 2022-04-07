module clock_divider(inclk,outclk,
	 outclk_not,clk_count,Reset);
	 input inclk;
	 input Reset;
     output outclk;
	 output outclk_not;
	 input[31:0] clk_count;
	 
	 logic [31:0] x;
	 
	 //This is a flip flop to count clocks
	 always_ff@(posedge inclk)
	 begin
	 if (Reset) begin x <= 0 ;outclk <= 1'b0 ; end	//if Reset button is pressed, signal should turn to 0
	 else begin
		if(x >= clk_count) begin					//if the counter gets the number of clocks that it needs to generate the frequency, it should count from 0 again
		outclk <= !outclk;							//And the signal should be inverted
		x <= 0;
		end 
		else x <= x + 1;
	 end
	 end
	 
endmodule


//The main function for the clock divider to connect with the Basic_organ_solution
module Generate_Organ_Tone_Divided_Clk32(inclk,outclk,outclk_Not,div_clk_count,Reset);
    input inclk;
	input Reset;
    output outclk;
	output outclk_Not;
	input[31:0] div_clk_count;
//Initiate an instance of the clock divider
	clock_divider clk_div(.inclk(inclk),.outclk(outclk),
	.outclk_not(outclk_Not),.clk_count(div_clk_count),.Reset(Reset));

	
endmodule