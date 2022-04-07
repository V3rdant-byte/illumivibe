#include "led.h"
#include <stdlib.h>
#include "system.h"
#include "altera_avalon_pio_regs.h"



void led_init(void)
{
	printf("Size of struct light_effect is %d bytes.\n",
			sizeof(light_effect_t));
	light_effect.pattern = PATTERN_STATIC;
	light_effect.period = 1000;
	light_effect.n_sequence = 1;
	light_effect.colors[0][0] = (255 << 16) + (0 << 8) + 0;
	light_effect.colors[0][1] = (0 << 16) + (255 << 8) + 0;
	light_effect.colors[0][2] = (0 << 16) + (0 << 8) + 255;
	light_effect.colors[0][3] = (128 << 16) + (255 << 8) + 0;
	light_effect.colors[0][4] = (255 << 16) + (128 << 8) + 0;
	light_effect.colors[0][5] = (0 << 16) + (255 << 8) + 128;
	light_effect.colors[0][6] = (0 << 16) + (128 << 8) + 255;
	light_effect.colors[0][7] = (255 << 16) + (0 << 8) + 128;
	light_effect.colors[0][8] = (128 << 16) + (0 << 8) + 255;
	light_effect.colors[0][9] = (128 << 16) + (128 << 8) + 0;
	light_effect.colors[0][10] = (128 << 16) + (0 << 8) + 128;
	light_effect.colors[0][11] = (0 << 16) + (128 << 8) + 128;
	setColor();
}

void flashing_tick(void)
{

}

void shifting_tick(void)
{

}

void setColor(void)
{
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_0_BASE, light_effect.colors[0][0]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_1_BASE, light_effect.colors[0][1]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_2_BASE, light_effect.colors[0][2]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_3_BASE, light_effect.colors[0][3]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_4_BASE, light_effect.colors[0][4]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_5_BASE, light_effect.colors[0][5]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_6_BASE, light_effect.colors[0][6]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_7_BASE, light_effect.colors[0][7]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_8_BASE, light_effect.colors[0][8]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_9_BASE, light_effect.colors[0][9]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_10_BASE, light_effect.colors[0][10]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_11_BASE, light_effect.colors[0][11]);

	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 1);
	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 0);
	//alt_putstr("COLOR DATA TRANSFERD!\n");
}
void setColor_1(void)
{
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_0_BASE, light_effect.colors[1][0]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_1_BASE, light_effect.colors[1][1]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_2_BASE, light_effect.colors[1][2]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_3_BASE, light_effect.colors[1][3]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_4_BASE, light_effect.colors[1][4]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_5_BASE, light_effect.colors[1][5]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_6_BASE, light_effect.colors[1][6]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_7_BASE, light_effect.colors[1][7]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_8_BASE, light_effect.colors[1][8]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_9_BASE, light_effect.colors[1][9]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_10_BASE, light_effect.colors[1][10]);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_11_BASE, light_effect.colors[1][11]);

	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 1);
	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 0);
	//alt_putstr("COLOR DATA TRANSFERD!\n");
}

void turnOffColor(void)
{
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_0_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_1_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_2_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_3_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_4_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_5_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_6_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_7_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_8_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_9_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_10_BASE, 0);
	IOWR_ALTERA_AVALON_PIO_DATA(COLOR_11_BASE, 0);

	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 1);
	IOWR_ALTERA_AVALON_PIO_DATA(START_BASE, 0);
}
