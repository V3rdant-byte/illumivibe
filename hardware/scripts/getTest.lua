function getContent()
    http.get("http://illumivibe.cf/api/public/device/00000001/light-effect/content", nil, function(code, data)
    if (code < 0) then
      print(code, data)
      print("HTTP request failed")
    else
      print("LIGHTEFFECT=" .. data)
    end
  end)
end

mytimer = tmr.create()
mytimer:register(5000, tmr.ALARM_AUTO, getContent)
mytimer:start()
