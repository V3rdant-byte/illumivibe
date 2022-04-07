/*
 * system.h - SOPC Builder system and BSP software package information
 *
 * Machine generated for CPU 'nios2_gen2_0' in SOPC Builder design 'SysForLed'
 * SOPC Builder design path: D:/CPEN391/DE1andLED/SysForLed.sopcinfo
 *
 * Generated: Tue Apr 05 16:04:20 PDT 2022
 */

/*
 * DO NOT MODIFY THIS FILE
 *
 * Changing this file will have subtle consequences
 * which will almost certainly lead to a nonfunctioning
 * system. If you do modify this file, be aware that your
 * changes will be overwritten and lost when this file
 * is generated again.
 *
 * DO NOT MODIFY THIS FILE
 */

/*
 * License Agreement
 *
 * Copyright (c) 2008
 * Altera Corporation, San Jose, California, USA.
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * This agreement shall be governed in all respects by the laws of the State
 * of California and by the laws of the United States of America.
 */

#ifndef __SYSTEM_H_
#define __SYSTEM_H_

/* Include definitions from linker script generator */
#include "linker.h"


/*
 * CPU configuration
 *
 */

#define ALT_CPU_ARCHITECTURE "altera_nios2_gen2"
#define ALT_CPU_BIG_ENDIAN 0
#define ALT_CPU_BREAK_ADDR 0x00080820
#define ALT_CPU_CPU_ARCH_NIOS2_R1
#define ALT_CPU_CPU_FREQ 50000000u
#define ALT_CPU_CPU_ID_SIZE 1
#define ALT_CPU_CPU_ID_VALUE 0x00000000
#define ALT_CPU_CPU_IMPLEMENTATION "fast"
#define ALT_CPU_DATA_ADDR_WIDTH 0x14
#define ALT_CPU_DCACHE_BYPASS_MASK 0x80000000
#define ALT_CPU_DCACHE_LINE_SIZE 32
#define ALT_CPU_DCACHE_LINE_SIZE_LOG2 5
#define ALT_CPU_DCACHE_SIZE 2048
#define ALT_CPU_EXCEPTION_ADDR 0x00040020
#define ALT_CPU_FLASH_ACCELERATOR_LINES 0
#define ALT_CPU_FLASH_ACCELERATOR_LINE_SIZE 0
#define ALT_CPU_FLUSHDA_SUPPORTED
#define ALT_CPU_FREQ 50000000
#define ALT_CPU_HARDWARE_DIVIDE_PRESENT 0
#define ALT_CPU_HARDWARE_MULTIPLY_PRESENT 1
#define ALT_CPU_HARDWARE_MULX_PRESENT 0
#define ALT_CPU_HAS_DEBUG_CORE 1
#define ALT_CPU_HAS_DEBUG_STUB
#define ALT_CPU_HAS_EXTRA_EXCEPTION_INFO
#define ALT_CPU_HAS_ILLEGAL_INSTRUCTION_EXCEPTION
#define ALT_CPU_HAS_JMPI_INSTRUCTION
#define ALT_CPU_ICACHE_LINE_SIZE 32
#define ALT_CPU_ICACHE_LINE_SIZE_LOG2 5
#define ALT_CPU_ICACHE_SIZE 4096
#define ALT_CPU_INITDA_SUPPORTED
#define ALT_CPU_INST_ADDR_WIDTH 0x14
#define ALT_CPU_NAME "nios2_gen2_0"
#define ALT_CPU_NUM_OF_SHADOW_REG_SETS 0
#define ALT_CPU_OCI_VERSION 1
#define ALT_CPU_RESET_ADDR 0x00040000


/*
 * CPU configuration (with legacy prefix - don't use these anymore)
 *
 */

#define NIOS2_BIG_ENDIAN 0
#define NIOS2_BREAK_ADDR 0x00080820
#define NIOS2_CPU_ARCH_NIOS2_R1
#define NIOS2_CPU_FREQ 50000000u
#define NIOS2_CPU_ID_SIZE 1
#define NIOS2_CPU_ID_VALUE 0x00000000
#define NIOS2_CPU_IMPLEMENTATION "fast"
#define NIOS2_DATA_ADDR_WIDTH 0x14
#define NIOS2_DCACHE_BYPASS_MASK 0x80000000
#define NIOS2_DCACHE_LINE_SIZE 32
#define NIOS2_DCACHE_LINE_SIZE_LOG2 5
#define NIOS2_DCACHE_SIZE 2048
#define NIOS2_EXCEPTION_ADDR 0x00040020
#define NIOS2_FLASH_ACCELERATOR_LINES 0
#define NIOS2_FLASH_ACCELERATOR_LINE_SIZE 0
#define NIOS2_FLUSHDA_SUPPORTED
#define NIOS2_HARDWARE_DIVIDE_PRESENT 0
#define NIOS2_HARDWARE_MULTIPLY_PRESENT 1
#define NIOS2_HARDWARE_MULX_PRESENT 0
#define NIOS2_HAS_DEBUG_CORE 1
#define NIOS2_HAS_DEBUG_STUB
#define NIOS2_HAS_EXTRA_EXCEPTION_INFO
#define NIOS2_HAS_ILLEGAL_INSTRUCTION_EXCEPTION
#define NIOS2_HAS_JMPI_INSTRUCTION
#define NIOS2_ICACHE_LINE_SIZE 32
#define NIOS2_ICACHE_LINE_SIZE_LOG2 5
#define NIOS2_ICACHE_SIZE 4096
#define NIOS2_INITDA_SUPPORTED
#define NIOS2_INST_ADDR_WIDTH 0x14
#define NIOS2_NUM_OF_SHADOW_REG_SETS 0
#define NIOS2_OCI_VERSION 1
#define NIOS2_RESET_ADDR 0x00040000


/*
 * Define for each module class mastered by the CPU
 *
 */

#define __ALTERA_AVALON_JTAG_UART
#define __ALTERA_AVALON_ONCHIP_MEMORY2
#define __ALTERA_AVALON_PIO
#define __ALTERA_AVALON_TIMER
#define __ALTERA_AVALON_UART
#define __ALTERA_NIOS2_GEN2


/*
 * System configuration
 *
 */

#define ALT_DEVICE_FAMILY "Cyclone V"
#define ALT_ENHANCED_INTERRUPT_API_PRESENT
#define ALT_IRQ_BASE NULL
#define ALT_LOG_PORT "/dev/null"
#define ALT_LOG_PORT_BASE 0x0
#define ALT_LOG_PORT_DEV null
#define ALT_LOG_PORT_TYPE ""
#define ALT_NUM_EXTERNAL_INTERRUPT_CONTROLLERS 0
#define ALT_NUM_INTERNAL_INTERRUPT_CONTROLLERS 1
#define ALT_NUM_INTERRUPT_CONTROLLERS 1
#define ALT_STDERR "/dev/jtag_uart_0"
#define ALT_STDERR_BASE 0x81130
#define ALT_STDERR_DEV jtag_uart_0
#define ALT_STDERR_IS_JTAG_UART
#define ALT_STDERR_PRESENT
#define ALT_STDERR_TYPE "altera_avalon_jtag_uart"
#define ALT_STDIN "/dev/jtag_uart_0"
#define ALT_STDIN_BASE 0x81130
#define ALT_STDIN_DEV jtag_uart_0
#define ALT_STDIN_IS_JTAG_UART
#define ALT_STDIN_PRESENT
#define ALT_STDIN_TYPE "altera_avalon_jtag_uart"
#define ALT_STDOUT "/dev/jtag_uart_0"
#define ALT_STDOUT_BASE 0x81130
#define ALT_STDOUT_DEV jtag_uart_0
#define ALT_STDOUT_IS_JTAG_UART
#define ALT_STDOUT_PRESENT
#define ALT_STDOUT_TYPE "altera_avalon_jtag_uart"
#define ALT_SYSTEM_NAME "SysForLed"


/*
 * color_0 configuration
 *
 */

#define ALT_MODULE_CLASS_color_0 altera_avalon_pio
#define COLOR_0_BASE 0x81120
#define COLOR_0_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_0_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_0_CAPTURE 0
#define COLOR_0_DATA_WIDTH 24
#define COLOR_0_DO_TEST_BENCH_WIRING 0
#define COLOR_0_DRIVEN_SIM_VALUE 0
#define COLOR_0_EDGE_TYPE "NONE"
#define COLOR_0_FREQ 50000000
#define COLOR_0_HAS_IN 0
#define COLOR_0_HAS_OUT 1
#define COLOR_0_HAS_TRI 0
#define COLOR_0_IRQ -1
#define COLOR_0_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_0_IRQ_TYPE "NONE"
#define COLOR_0_NAME "/dev/color_0"
#define COLOR_0_RESET_VALUE 0
#define COLOR_0_SPAN 16
#define COLOR_0_TYPE "altera_avalon_pio"


/*
 * color_1 configuration
 *
 */

#define ALT_MODULE_CLASS_color_1 altera_avalon_pio
#define COLOR_1_BASE 0x81110
#define COLOR_1_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_1_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_1_CAPTURE 0
#define COLOR_1_DATA_WIDTH 24
#define COLOR_1_DO_TEST_BENCH_WIRING 0
#define COLOR_1_DRIVEN_SIM_VALUE 0
#define COLOR_1_EDGE_TYPE "NONE"
#define COLOR_1_FREQ 50000000
#define COLOR_1_HAS_IN 0
#define COLOR_1_HAS_OUT 1
#define COLOR_1_HAS_TRI 0
#define COLOR_1_IRQ -1
#define COLOR_1_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_1_IRQ_TYPE "NONE"
#define COLOR_1_NAME "/dev/color_1"
#define COLOR_1_RESET_VALUE 0
#define COLOR_1_SPAN 16
#define COLOR_1_TYPE "altera_avalon_pio"


/*
 * color_10 configuration
 *
 */

#define ALT_MODULE_CLASS_color_10 altera_avalon_pio
#define COLOR_10_BASE 0x81080
#define COLOR_10_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_10_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_10_CAPTURE 0
#define COLOR_10_DATA_WIDTH 24
#define COLOR_10_DO_TEST_BENCH_WIRING 0
#define COLOR_10_DRIVEN_SIM_VALUE 0
#define COLOR_10_EDGE_TYPE "NONE"
#define COLOR_10_FREQ 50000000
#define COLOR_10_HAS_IN 0
#define COLOR_10_HAS_OUT 1
#define COLOR_10_HAS_TRI 0
#define COLOR_10_IRQ -1
#define COLOR_10_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_10_IRQ_TYPE "NONE"
#define COLOR_10_NAME "/dev/color_10"
#define COLOR_10_RESET_VALUE 0
#define COLOR_10_SPAN 16
#define COLOR_10_TYPE "altera_avalon_pio"


/*
 * color_11 configuration
 *
 */

#define ALT_MODULE_CLASS_color_11 altera_avalon_pio
#define COLOR_11_BASE 0x81070
#define COLOR_11_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_11_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_11_CAPTURE 0
#define COLOR_11_DATA_WIDTH 24
#define COLOR_11_DO_TEST_BENCH_WIRING 0
#define COLOR_11_DRIVEN_SIM_VALUE 0
#define COLOR_11_EDGE_TYPE "NONE"
#define COLOR_11_FREQ 50000000
#define COLOR_11_HAS_IN 0
#define COLOR_11_HAS_OUT 1
#define COLOR_11_HAS_TRI 0
#define COLOR_11_IRQ -1
#define COLOR_11_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_11_IRQ_TYPE "NONE"
#define COLOR_11_NAME "/dev/color_11"
#define COLOR_11_RESET_VALUE 0
#define COLOR_11_SPAN 16
#define COLOR_11_TYPE "altera_avalon_pio"


/*
 * color_2 configuration
 *
 */

#define ALT_MODULE_CLASS_color_2 altera_avalon_pio
#define COLOR_2_BASE 0x81100
#define COLOR_2_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_2_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_2_CAPTURE 0
#define COLOR_2_DATA_WIDTH 24
#define COLOR_2_DO_TEST_BENCH_WIRING 0
#define COLOR_2_DRIVEN_SIM_VALUE 0
#define COLOR_2_EDGE_TYPE "NONE"
#define COLOR_2_FREQ 50000000
#define COLOR_2_HAS_IN 0
#define COLOR_2_HAS_OUT 1
#define COLOR_2_HAS_TRI 0
#define COLOR_2_IRQ -1
#define COLOR_2_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_2_IRQ_TYPE "NONE"
#define COLOR_2_NAME "/dev/color_2"
#define COLOR_2_RESET_VALUE 0
#define COLOR_2_SPAN 16
#define COLOR_2_TYPE "altera_avalon_pio"


/*
 * color_3 configuration
 *
 */

#define ALT_MODULE_CLASS_color_3 altera_avalon_pio
#define COLOR_3_BASE 0x810f0
#define COLOR_3_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_3_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_3_CAPTURE 0
#define COLOR_3_DATA_WIDTH 24
#define COLOR_3_DO_TEST_BENCH_WIRING 0
#define COLOR_3_DRIVEN_SIM_VALUE 0
#define COLOR_3_EDGE_TYPE "NONE"
#define COLOR_3_FREQ 50000000
#define COLOR_3_HAS_IN 0
#define COLOR_3_HAS_OUT 1
#define COLOR_3_HAS_TRI 0
#define COLOR_3_IRQ -1
#define COLOR_3_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_3_IRQ_TYPE "NONE"
#define COLOR_3_NAME "/dev/color_3"
#define COLOR_3_RESET_VALUE 0
#define COLOR_3_SPAN 16
#define COLOR_3_TYPE "altera_avalon_pio"


/*
 * color_4 configuration
 *
 */

#define ALT_MODULE_CLASS_color_4 altera_avalon_pio
#define COLOR_4_BASE 0x810e0
#define COLOR_4_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_4_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_4_CAPTURE 0
#define COLOR_4_DATA_WIDTH 24
#define COLOR_4_DO_TEST_BENCH_WIRING 0
#define COLOR_4_DRIVEN_SIM_VALUE 0
#define COLOR_4_EDGE_TYPE "NONE"
#define COLOR_4_FREQ 50000000
#define COLOR_4_HAS_IN 0
#define COLOR_4_HAS_OUT 1
#define COLOR_4_HAS_TRI 0
#define COLOR_4_IRQ -1
#define COLOR_4_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_4_IRQ_TYPE "NONE"
#define COLOR_4_NAME "/dev/color_4"
#define COLOR_4_RESET_VALUE 0
#define COLOR_4_SPAN 16
#define COLOR_4_TYPE "altera_avalon_pio"


/*
 * color_5 configuration
 *
 */

#define ALT_MODULE_CLASS_color_5 altera_avalon_pio
#define COLOR_5_BASE 0x810d0
#define COLOR_5_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_5_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_5_CAPTURE 0
#define COLOR_5_DATA_WIDTH 24
#define COLOR_5_DO_TEST_BENCH_WIRING 0
#define COLOR_5_DRIVEN_SIM_VALUE 0
#define COLOR_5_EDGE_TYPE "NONE"
#define COLOR_5_FREQ 50000000
#define COLOR_5_HAS_IN 0
#define COLOR_5_HAS_OUT 1
#define COLOR_5_HAS_TRI 0
#define COLOR_5_IRQ -1
#define COLOR_5_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_5_IRQ_TYPE "NONE"
#define COLOR_5_NAME "/dev/color_5"
#define COLOR_5_RESET_VALUE 0
#define COLOR_5_SPAN 16
#define COLOR_5_TYPE "altera_avalon_pio"


/*
 * color_6 configuration
 *
 */

#define ALT_MODULE_CLASS_color_6 altera_avalon_pio
#define COLOR_6_BASE 0x810c0
#define COLOR_6_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_6_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_6_CAPTURE 0
#define COLOR_6_DATA_WIDTH 24
#define COLOR_6_DO_TEST_BENCH_WIRING 0
#define COLOR_6_DRIVEN_SIM_VALUE 0
#define COLOR_6_EDGE_TYPE "NONE"
#define COLOR_6_FREQ 50000000
#define COLOR_6_HAS_IN 0
#define COLOR_6_HAS_OUT 1
#define COLOR_6_HAS_TRI 0
#define COLOR_6_IRQ -1
#define COLOR_6_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_6_IRQ_TYPE "NONE"
#define COLOR_6_NAME "/dev/color_6"
#define COLOR_6_RESET_VALUE 0
#define COLOR_6_SPAN 16
#define COLOR_6_TYPE "altera_avalon_pio"


/*
 * color_7 configuration
 *
 */

#define ALT_MODULE_CLASS_color_7 altera_avalon_pio
#define COLOR_7_BASE 0x810b0
#define COLOR_7_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_7_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_7_CAPTURE 0
#define COLOR_7_DATA_WIDTH 24
#define COLOR_7_DO_TEST_BENCH_WIRING 0
#define COLOR_7_DRIVEN_SIM_VALUE 0
#define COLOR_7_EDGE_TYPE "NONE"
#define COLOR_7_FREQ 50000000
#define COLOR_7_HAS_IN 0
#define COLOR_7_HAS_OUT 1
#define COLOR_7_HAS_TRI 0
#define COLOR_7_IRQ -1
#define COLOR_7_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_7_IRQ_TYPE "NONE"
#define COLOR_7_NAME "/dev/color_7"
#define COLOR_7_RESET_VALUE 0
#define COLOR_7_SPAN 16
#define COLOR_7_TYPE "altera_avalon_pio"


/*
 * color_8 configuration
 *
 */

#define ALT_MODULE_CLASS_color_8 altera_avalon_pio
#define COLOR_8_BASE 0x810a0
#define COLOR_8_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_8_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_8_CAPTURE 0
#define COLOR_8_DATA_WIDTH 24
#define COLOR_8_DO_TEST_BENCH_WIRING 0
#define COLOR_8_DRIVEN_SIM_VALUE 0
#define COLOR_8_EDGE_TYPE "NONE"
#define COLOR_8_FREQ 50000000
#define COLOR_8_HAS_IN 0
#define COLOR_8_HAS_OUT 1
#define COLOR_8_HAS_TRI 0
#define COLOR_8_IRQ -1
#define COLOR_8_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_8_IRQ_TYPE "NONE"
#define COLOR_8_NAME "/dev/color_8"
#define COLOR_8_RESET_VALUE 0
#define COLOR_8_SPAN 16
#define COLOR_8_TYPE "altera_avalon_pio"


/*
 * color_9 configuration
 *
 */

#define ALT_MODULE_CLASS_color_9 altera_avalon_pio
#define COLOR_9_BASE 0x81090
#define COLOR_9_BIT_CLEARING_EDGE_REGISTER 0
#define COLOR_9_BIT_MODIFYING_OUTPUT_REGISTER 0
#define COLOR_9_CAPTURE 0
#define COLOR_9_DATA_WIDTH 24
#define COLOR_9_DO_TEST_BENCH_WIRING 0
#define COLOR_9_DRIVEN_SIM_VALUE 0
#define COLOR_9_EDGE_TYPE "NONE"
#define COLOR_9_FREQ 50000000
#define COLOR_9_HAS_IN 0
#define COLOR_9_HAS_OUT 1
#define COLOR_9_HAS_TRI 0
#define COLOR_9_IRQ -1
#define COLOR_9_IRQ_INTERRUPT_CONTROLLER_ID -1
#define COLOR_9_IRQ_TYPE "NONE"
#define COLOR_9_NAME "/dev/color_9"
#define COLOR_9_RESET_VALUE 0
#define COLOR_9_SPAN 16
#define COLOR_9_TYPE "altera_avalon_pio"


/*
 * hal configuration
 *
 */

#define ALT_INCLUDE_INSTRUCTION_RELATED_EXCEPTION_API
#define ALT_MAX_FD 32
#define ALT_SYS_CLK TIMER_0
#define ALT_TIMESTAMP_CLK none


/*
 * jtag_uart_0 configuration
 *
 */

#define ALT_MODULE_CLASS_jtag_uart_0 altera_avalon_jtag_uart
#define JTAG_UART_0_BASE 0x81130
#define JTAG_UART_0_IRQ 0
#define JTAG_UART_0_IRQ_INTERRUPT_CONTROLLER_ID 0
#define JTAG_UART_0_NAME "/dev/jtag_uart_0"
#define JTAG_UART_0_READ_DEPTH 64
#define JTAG_UART_0_READ_THRESHOLD 8
#define JTAG_UART_0_SPAN 8
#define JTAG_UART_0_TYPE "altera_avalon_jtag_uart"
#define JTAG_UART_0_WRITE_DEPTH 64
#define JTAG_UART_0_WRITE_THRESHOLD 8


/*
 * onchip_memory2_0 configuration
 *
 */

#define ALT_MODULE_CLASS_onchip_memory2_0 altera_avalon_onchip_memory2
#define ONCHIP_MEMORY2_0_ALLOW_IN_SYSTEM_MEMORY_CONTENT_EDITOR 0
#define ONCHIP_MEMORY2_0_ALLOW_MRAM_SIM_CONTENTS_ONLY_FILE 0
#define ONCHIP_MEMORY2_0_BASE 0x40000
#define ONCHIP_MEMORY2_0_CONTENTS_INFO ""
#define ONCHIP_MEMORY2_0_DUAL_PORT 0
#define ONCHIP_MEMORY2_0_GUI_RAM_BLOCK_TYPE "AUTO"
#define ONCHIP_MEMORY2_0_INIT_CONTENTS_FILE "SysForLed_onchip_memory2_0"
#define ONCHIP_MEMORY2_0_INIT_MEM_CONTENT 1
#define ONCHIP_MEMORY2_0_INSTANCE_ID "NONE"
#define ONCHIP_MEMORY2_0_IRQ -1
#define ONCHIP_MEMORY2_0_IRQ_INTERRUPT_CONTROLLER_ID -1
#define ONCHIP_MEMORY2_0_NAME "/dev/onchip_memory2_0"
#define ONCHIP_MEMORY2_0_NON_DEFAULT_INIT_FILE_ENABLED 0
#define ONCHIP_MEMORY2_0_RAM_BLOCK_TYPE "AUTO"
#define ONCHIP_MEMORY2_0_READ_DURING_WRITE_MODE "DONT_CARE"
#define ONCHIP_MEMORY2_0_SINGLE_CLOCK_OP 0
#define ONCHIP_MEMORY2_0_SIZE_MULTIPLE 1
#define ONCHIP_MEMORY2_0_SIZE_VALUE 262144
#define ONCHIP_MEMORY2_0_SPAN 262144
#define ONCHIP_MEMORY2_0_TYPE "altera_avalon_onchip_memory2"
#define ONCHIP_MEMORY2_0_WRITABLE 1


/*
 * start configuration
 *
 */

#define ALT_MODULE_CLASS_start altera_avalon_pio
#define START_BASE 0x81060
#define START_BIT_CLEARING_EDGE_REGISTER 0
#define START_BIT_MODIFYING_OUTPUT_REGISTER 0
#define START_CAPTURE 0
#define START_DATA_WIDTH 1
#define START_DO_TEST_BENCH_WIRING 0
#define START_DRIVEN_SIM_VALUE 0
#define START_EDGE_TYPE "NONE"
#define START_FREQ 50000000
#define START_HAS_IN 0
#define START_HAS_OUT 1
#define START_HAS_TRI 0
#define START_IRQ -1
#define START_IRQ_INTERRUPT_CONTROLLER_ID -1
#define START_IRQ_TYPE "NONE"
#define START_NAME "/dev/start"
#define START_RESET_VALUE 0
#define START_SPAN 16
#define START_TYPE "altera_avalon_pio"


/*
 * timer_0 configuration
 *
 */

#define ALT_MODULE_CLASS_timer_0 altera_avalon_timer
#define TIMER_0_ALWAYS_RUN 0
#define TIMER_0_BASE 0x81020
#define TIMER_0_COUNTER_SIZE 32
#define TIMER_0_FIXED_PERIOD 1
#define TIMER_0_FREQ 50000000
#define TIMER_0_IRQ 2
#define TIMER_0_IRQ_INTERRUPT_CONTROLLER_ID 0
#define TIMER_0_LOAD_VALUE 499999
#define TIMER_0_MULT 0.001
#define TIMER_0_NAME "/dev/timer_0"
#define TIMER_0_PERIOD 10
#define TIMER_0_PERIOD_UNITS "ms"
#define TIMER_0_RESET_OUTPUT 0
#define TIMER_0_SNAPSHOT 1
#define TIMER_0_SPAN 32
#define TIMER_0_TICKS_PER_SEC 100
#define TIMER_0_TIMEOUT_PULSE_OUTPUT 0
#define TIMER_0_TYPE "altera_avalon_timer"


/*
 * timer_1 configuration
 *
 */

#define ALT_MODULE_CLASS_timer_1 altera_avalon_timer
#define TIMER_1_ALWAYS_RUN 0
#define TIMER_1_BASE 0x81000
#define TIMER_1_COUNTER_SIZE 32
#define TIMER_1_FIXED_PERIOD 1
#define TIMER_1_FREQ 50000000
#define TIMER_1_IRQ 3
#define TIMER_1_IRQ_INTERRUPT_CONTROLLER_ID 0
#define TIMER_1_LOAD_VALUE 499999
#define TIMER_1_MULT 0.001
#define TIMER_1_NAME "/dev/timer_1"
#define TIMER_1_PERIOD 10
#define TIMER_1_PERIOD_UNITS "ms"
#define TIMER_1_RESET_OUTPUT 0
#define TIMER_1_SNAPSHOT 1
#define TIMER_1_SPAN 32
#define TIMER_1_TICKS_PER_SEC 100
#define TIMER_1_TIMEOUT_PULSE_OUTPUT 0
#define TIMER_1_TYPE "altera_avalon_timer"


/*
 * ucosii configuration
 *
 */

#define OS_ARG_CHK_EN 1
#define OS_CPU_HOOKS_EN 1
#define OS_DEBUG_EN 1
#define OS_EVENT_NAME_SIZE 32
#define OS_FLAGS_NBITS 16
#define OS_FLAG_ACCEPT_EN 1
#define OS_FLAG_DEL_EN 1
#define OS_FLAG_EN 1
#define OS_FLAG_NAME_SIZE 32
#define OS_FLAG_QUERY_EN 1
#define OS_FLAG_WAIT_CLR_EN 1
#define OS_LOWEST_PRIO 20
#define OS_MAX_EVENTS 60
#define OS_MAX_FLAGS 20
#define OS_MAX_MEM_PART 60
#define OS_MAX_QS 20
#define OS_MAX_TASKS 10
#define OS_MBOX_ACCEPT_EN 1
#define OS_MBOX_DEL_EN 1
#define OS_MBOX_EN 1
#define OS_MBOX_POST_EN 1
#define OS_MBOX_POST_OPT_EN 1
#define OS_MBOX_QUERY_EN 1
#define OS_MEM_EN 1
#define OS_MEM_NAME_SIZE 32
#define OS_MEM_QUERY_EN 1
#define OS_MUTEX_ACCEPT_EN 1
#define OS_MUTEX_DEL_EN 1
#define OS_MUTEX_EN 1
#define OS_MUTEX_QUERY_EN 1
#define OS_Q_ACCEPT_EN 1
#define OS_Q_DEL_EN 1
#define OS_Q_EN 1
#define OS_Q_FLUSH_EN 1
#define OS_Q_POST_EN 1
#define OS_Q_POST_FRONT_EN 1
#define OS_Q_POST_OPT_EN 1
#define OS_Q_QUERY_EN 1
#define OS_SCHED_LOCK_EN 1
#define OS_SEM_ACCEPT_EN 1
#define OS_SEM_DEL_EN 1
#define OS_SEM_EN 1
#define OS_SEM_QUERY_EN 1
#define OS_SEM_SET_EN 1
#define OS_TASK_CHANGE_PRIO_EN 1
#define OS_TASK_CREATE_EN 1
#define OS_TASK_CREATE_EXT_EN 1
#define OS_TASK_DEL_EN 1
#define OS_TASK_IDLE_STK_SIZE 512
#define OS_TASK_NAME_SIZE 32
#define OS_TASK_PROFILE_EN 1
#define OS_TASK_QUERY_EN 1
#define OS_TASK_STAT_EN 1
#define OS_TASK_STAT_STK_CHK_EN 1
#define OS_TASK_STAT_STK_SIZE 512
#define OS_TASK_SUSPEND_EN 1
#define OS_TASK_SW_HOOK_EN 1
#define OS_TASK_TMR_PRIO 0
#define OS_TASK_TMR_STK_SIZE 512
#define OS_THREAD_SAFE_NEWLIB 1
#define OS_TICKS_PER_SEC TIMER_0_TICKS_PER_SEC
#define OS_TICK_STEP_EN 1
#define OS_TIME_DLY_HMSM_EN 1
#define OS_TIME_DLY_RESUME_EN 1
#define OS_TIME_GET_SET_EN 1
#define OS_TIME_TICK_HOOK_EN 1
#define OS_TMR_CFG_MAX 16
#define OS_TMR_CFG_NAME_SIZE 16
#define OS_TMR_CFG_TICKS_PER_SEC 10
#define OS_TMR_CFG_WHEEL_SIZE 2
#define OS_TMR_EN 0


/*
 * wifi_uart0 configuration
 *
 */

#define ALT_MODULE_CLASS_wifi_uart0 altera_avalon_uart
#define WIFI_UART0_BASE 0x81040
#define WIFI_UART0_BAUD 115200
#define WIFI_UART0_DATA_BITS 8
#define WIFI_UART0_FIXED_BAUD 1
#define WIFI_UART0_FREQ 50000000
#define WIFI_UART0_IRQ 1
#define WIFI_UART0_IRQ_INTERRUPT_CONTROLLER_ID 0
#define WIFI_UART0_NAME "/dev/wifi_uart0"
#define WIFI_UART0_PARITY 'N'
#define WIFI_UART0_SIM_CHAR_STREAM ""
#define WIFI_UART0_SIM_TRUE_BAUD 0
#define WIFI_UART0_SPAN 32
#define WIFI_UART0_STOP_BITS 1
#define WIFI_UART0_SYNC_REG_DEPTH 2
#define WIFI_UART0_TYPE "altera_avalon_uart"
#define WIFI_UART0_USE_CTS_RTS 1
#define WIFI_UART0_USE_EOP_REGISTER 0

#endif /* __SYSTEM_H_ */
