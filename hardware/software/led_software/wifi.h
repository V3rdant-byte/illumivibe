#ifndef _WIFI_H_
#define	_WIFI_H_

#include "led.h"

#define MAX_LINE sizeof(struct light_effect) * 2
#define LE_PREFIX "LIGHTEFFECT="

void wifi_task(void* pdata);

#endif	/* _WIFI_H_ */
