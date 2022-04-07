	component SysForLed is
		port (
			clk_clk                              : in  std_logic                     := 'X'; -- clk
			color_0_export                       : out std_logic_vector(23 downto 0);        -- export
			color_1_export                       : out std_logic_vector(23 downto 0);        -- export
			color_10_export                      : out std_logic_vector(23 downto 0);        -- export
			color_11_export                      : out std_logic_vector(23 downto 0);        -- export
			color_2_export                       : out std_logic_vector(23 downto 0);        -- export
			color_3_export                       : out std_logic_vector(23 downto 0);        -- export
			color_4_export                       : out std_logic_vector(23 downto 0);        -- export
			color_5_export                       : out std_logic_vector(23 downto 0);        -- export
			color_6_export                       : out std_logic_vector(23 downto 0);        -- export
			color_7_export                       : out std_logic_vector(23 downto 0);        -- export
			color_8_export                       : out std_logic_vector(23 downto 0);        -- export
			color_9_export                       : out std_logic_vector(23 downto 0);        -- export
			reset_reset_n                        : in  std_logic                     := 'X'; -- reset_n
			start_external_connection_export     : out std_logic;                            -- export
			wifi_uart0_external_connection_rxd   : in  std_logic                     := 'X'; -- rxd
			wifi_uart0_external_connection_txd   : out std_logic;                            -- txd
			wifi_uart0_external_connection_cts_n : in  std_logic                     := 'X'; -- cts_n
			wifi_uart0_external_connection_rts_n : out std_logic                             -- rts_n
		);
	end component SysForLed;

	u0 : component SysForLed
		port map (
			clk_clk                              => CONNECTED_TO_clk_clk,                              --                            clk.clk
			color_0_export                       => CONNECTED_TO_color_0_export,                       --                        color_0.export
			color_1_export                       => CONNECTED_TO_color_1_export,                       --                        color_1.export
			color_10_export                      => CONNECTED_TO_color_10_export,                      --                       color_10.export
			color_11_export                      => CONNECTED_TO_color_11_export,                      --                       color_11.export
			color_2_export                       => CONNECTED_TO_color_2_export,                       --                        color_2.export
			color_3_export                       => CONNECTED_TO_color_3_export,                       --                        color_3.export
			color_4_export                       => CONNECTED_TO_color_4_export,                       --                        color_4.export
			color_5_export                       => CONNECTED_TO_color_5_export,                       --                        color_5.export
			color_6_export                       => CONNECTED_TO_color_6_export,                       --                        color_6.export
			color_7_export                       => CONNECTED_TO_color_7_export,                       --                        color_7.export
			color_8_export                       => CONNECTED_TO_color_8_export,                       --                        color_8.export
			color_9_export                       => CONNECTED_TO_color_9_export,                       --                        color_9.export
			reset_reset_n                        => CONNECTED_TO_reset_reset_n,                        --                          reset.reset_n
			start_external_connection_export     => CONNECTED_TO_start_external_connection_export,     --      start_external_connection.export
			wifi_uart0_external_connection_rxd   => CONNECTED_TO_wifi_uart0_external_connection_rxd,   -- wifi_uart0_external_connection.rxd
			wifi_uart0_external_connection_txd   => CONNECTED_TO_wifi_uart0_external_connection_txd,   --                               .txd
			wifi_uart0_external_connection_cts_n => CONNECTED_TO_wifi_uart0_external_connection_cts_n, --                               .cts_n
			wifi_uart0_external_connection_rts_n => CONNECTED_TO_wifi_uart0_external_connection_rts_n  --                               .rts_n
		);

