#include "wifi.h"
#include <stdio.h>
#include <string.h>
#include "system.h"
#include "base64.h"
#include "led.h"
#include "timer.h"

static char line[MAX_LINE];
static void process_line(char *line);

void process_line(char *line);

int light_state = 0;

void wifi_task(void* pdata) {
	FILE* fp = fopen(WIFI_UART0_NAME, "rw+");
	if (!fp) {
		printf("Open failed.");
		return;
	}
	while (1) {
		if (!fgets(line, MAX_LINE, fp)) {
			printf("fgets failed.");
		}
		printf(line);
		process_line(line);
	}
	fclose(fp);
}

void process_line(char *line)
{
	static size_t prefix_length = strlen(LE_PREFIX);
	if (strncmp(LE_PREFIX, line, prefix_length) != 0) {
		return;
	}

	char *effect = line + prefix_length;
	printf("Receive light effect content: %s\n", effect);
	// NOTE: b64tobin is unsafe
	void *ptr = b64tobin((void *)&light_effect_tmp, effect);



	if (ptr == NULL) {
		printf("Invalid base64 format\n");
	} else {
		printf("Successfully parsed light effect data. "
				"pattern=%d, period=%d, n_sequence = %d, "
				"first color=%x\n", light_effect.pattern,
				light_effect.period, light_effect.n_sequence,
				light_effect.colors[0][0]);
	}

	printf("old checksum: %d\n", light_effect.checksum);
	printf("new checksum: %d\n", light_effect_tmp.checksum);
	if (light_effect.checksum == light_effect_tmp.checksum) {
		printf("light effect unchanged\n");
		return;
	} else {
		printf("light effect changed\n");
		memcpy((void *) &light_effect, (void *) &light_effect_tmp, 112);
	}

	if (light_effect.pattern == PATTERN_STATIC) {

		if (light_state == 2) {
			timer_disable_0();
		} else if (light_state == 3){
			timer_disable_1();
		}
		setColor();
		light_state = 1;
	} else if (light_effect.pattern == PATTERN_FLASHING) {

		if (light_state != 2) {
			if (light_state == 3) {
				timer_disable_1();
			}
			timer_Initial_0();
			light_state = 2;
		}

	} else if (light_effect.pattern == PATTERN_SHIFTING) {

		if (light_state != 3) {
			if (light_state == 2) {
				timer_disable_0();
			}
			timer_Initial_1();
			light_state = 3;
		}

	}
}
