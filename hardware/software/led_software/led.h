#ifndef _LED_H_
#define	_LED_H_

#define MAX_SEQUENCE_N 2
#define PATTERN_NONE 0
#define PATTERN_STATIC 1
#define PATTERN_FLASHING 2
#define PATTERN_SHIFTING 3



typedef struct light_effect {
	unsigned int pattern;
	unsigned int period; // in ms
	unsigned int n_sequence;
	unsigned int colors[MAX_SEQUENCE_N][12];
	unsigned int checksum;
} light_effect_t;

volatile light_effect_t light_effect;
volatile light_effect_t light_effect_tmp;

void led_init(void);

void flashing_tick(void);
void shifting_tick(void);

void setColor(void);
void setColor_1(void);
void turnOffColor(void);


#endif	/* _LED_H_ */
