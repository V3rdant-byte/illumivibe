#include "timer.h"
#include <stdlib.h>
#include "system.h"
#include "altera_avalon_timer_regs.h"
#include "sys/alt_irq.h"
#include "led.h"

unsigned int timer_isr_context;

void timer_ISR_0(void *timer_isr_context);
void timer_ISR_1(void *timer_isr_context);
int flashing_counter = 0x00;
int shifting_counter = 0x00;
int flashing_state = 0;

/*
 * The timer interrupt configuration code is cited from
 * https://titanwolf.org/Network/Articles/Article?AID=1e239fca-bf5a-4cfc-89fb-a13d9e861453
 */
void timer_Initial_0(void)
{
   void *isr_context_ptr = (void *) &timer_isr_context;

   IOWR_ALTERA_AVALON_TIMER_PERIODH(TIMER_0_BASE, 0x0007);
   IOWR_ALTERA_AVALON_TIMER_PERIODL(TIMER_0_BASE, 0xA11F);

   IOWR_ALTERA_AVALON_TIMER_CONTROL(TIMER_0_BASE,
     ALTERA_AVALON_TIMER_CONTROL_START_MSK |
     ALTERA_AVALON_TIMER_CONTROL_CONT_MSK  |
     ALTERA_AVALON_TIMER_CONTROL_ITO_MSK);
   alt_ic_isr_register(
       TIMER_0_IRQ_INTERRUPT_CONTROLLER_ID,
       TIMER_0_IRQ,
       timer_ISR_0,
       isr_context_ptr,
       0x0);
   alt_ic_irq_enable(TIMER_0_IRQ_INTERRUPT_CONTROLLER_ID,
		   TIMER_0_IRQ );
}

void timer_disable_0(void)
{
	alt_ic_irq_disable(TIMER_0_IRQ_INTERRUPT_CONTROLLER_ID,
	   		   TIMER_0_IRQ );
}

void timer_disable_1(void)
{
	alt_ic_irq_disable(TIMER_1_IRQ_INTERRUPT_CONTROLLER_ID,
	   		   TIMER_1_IRQ );
}

/*
 * The timer interrupt configuration code is cited from
 * https://titanwolf.org/Network/Articles/Article?AID=1e239fca-bf5a-4cfc-89fb-a13d9e861453
 */
void timer_Initial_1(void)
{
   void *isr_context_ptr = (void *) &timer_isr_context;

   IOWR_ALTERA_AVALON_TIMER_PERIODH(TIMER_1_BASE, 0x0007);
   IOWR_ALTERA_AVALON_TIMER_PERIODL(TIMER_1_BASE, 0xA11F);

   IOWR_ALTERA_AVALON_TIMER_CONTROL(TIMER_1_BASE,
     ALTERA_AVALON_TIMER_CONTROL_START_MSK |
     ALTERA_AVALON_TIMER_CONTROL_CONT_MSK  |
     ALTERA_AVALON_TIMER_CONTROL_ITO_MSK);
   alt_ic_isr_register(
       TIMER_1_IRQ_INTERRUPT_CONTROLLER_ID,
       TIMER_1_IRQ,
       timer_ISR_1,
       isr_context_ptr,
       0x0);
   alt_ic_irq_enable(TIMER_1_IRQ_INTERRUPT_CONTROLLER_ID,
   		   TIMER_1_IRQ );
}

void timer_ISR_0(void *timer_isr_context)
{
	int period = light_effect.period;
	IOWR_ALTERA_AVALON_TIMER_STATUS(TIMER_0_BASE, 0);
	if (flashing_counter == period) {
		flashing_state = 1;
	} else if (flashing_counter == 2 * period) {
		flashing_state = 0;
		flashing_counter = 0;
	}

	if (flashing_state == 0) {
		setColor();
	} else {
		setColor_1();
	}

	flashing_counter++;
}

void timer_ISR_1(void *timer_isr_context)
{
	int period = light_effect.period;
	IOWR_ALTERA_AVALON_TIMER_STATUS(TIMER_1_BASE, 0);
	if (shifting_counter == period) {
		int * copyColors = malloc(12 * sizeof(int));
		for (int i = 0; i < 12; i++) {
			copyColors[i] = light_effect.colors[0][i];
		}
		light_effect.colors[0][0] = copyColors[11];

		for (int i = 1; i < 12; i++) {
			light_effect.colors[0][i] = copyColors[i - 1];
		}
		free(copyColors);
		setColor();
		shifting_counter = 0;
	}
	shifting_counter++;
}
