
module SysForLed (
	clk_clk,
	color_0_export,
	color_1_export,
	color_10_export,
	color_11_export,
	color_2_export,
	color_3_export,
	color_4_export,
	color_5_export,
	color_6_export,
	color_7_export,
	color_8_export,
	color_9_export,
	reset_reset_n,
	start_external_connection_export,
	wifi_uart0_external_connection_rxd,
	wifi_uart0_external_connection_txd,
	wifi_uart0_external_connection_cts_n,
	wifi_uart0_external_connection_rts_n);	

	input		clk_clk;
	output	[23:0]	color_0_export;
	output	[23:0]	color_1_export;
	output	[23:0]	color_10_export;
	output	[23:0]	color_11_export;
	output	[23:0]	color_2_export;
	output	[23:0]	color_3_export;
	output	[23:0]	color_4_export;
	output	[23:0]	color_5_export;
	output	[23:0]	color_6_export;
	output	[23:0]	color_7_export;
	output	[23:0]	color_8_export;
	output	[23:0]	color_9_export;
	input		reset_reset_n;
	output		start_external_connection_export;
	input		wifi_uart0_external_connection_rxd;
	output		wifi_uart0_external_connection_txd;
	input		wifi_uart0_external_connection_cts_n;
	output		wifi_uart0_external_connection_rts_n;
endmodule
