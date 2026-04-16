@echo off
title Radio Japan Immersion Edition
:menu
cls
echo ======================================================
echo      	REPRODUCTOR DE MEDIOS JAPONESES
echo ======================================================
set "hora=%time:~0,2%"
set /a jp_hora=(%hora% + 12) %% 24
echo [ INFO ] Hora Local: %time:~0,5%  ^|  Hora en Japon: %jp_hora%:%time:~3,2% JST
echo ======================================================
echo      				RADIOS 
echo ======================================================
echo 1. J1 GOLD (70s/80s) 
echo 2. JAPAN CITY POP 
echo 3. iiii
echo 4. iiii
echo 5. J-POP SAKURA (Nostalgia 80s/90s)
echo ======================================================
echo      		     TELEVISION
echo ======================================================
echo 6. NHK World-Japan LiVE
echo 7. iiiii
echo 8. iiiii
echo ======================================================
echo      		     PLAYLIST YOUTUBE
echo ======================================================
echo 9. Galneryus Best songs
echo 10. salir
echo ======================================================
set /p opt="Elige tu estacion: "

set "vlc=C:\Program Files\VideoLAN\VLC\vlc.exe"

if %opt%==1 goto j1gold
if %opt%==2 goto citypop
if %opt%==3 goto takasaki
if %opt%==4 goto kishiwada
if %opt%==5 goto sakura
if %opt%==6 goto nhk
if %opt%==7 goto wowo
if %opt%==8 goto nhk
if %opt%==9 goto galneryus
if %opt%==10 exit
goto menu

:j1gold
echo Conectando a J1 GOLD...
start "" "%vlc%" --intf dummy http://gold.j1fm.tokyo/
goto pause_menu

:citypop
echo Conectando a Japan City Pop...
start "" "%vlc%" --intf dummy https://play.streamafrica.net/japancitypop
goto pause_menu

:takasaki
echo Conectando a Radio Takasaki...
start "" "%vlc%" --intf dummy https://musicbird-hls.cdn.jstream.jp/radioshp/763.m3u8/playlist.m3u8
goto pause_menu

:kishiwada
echo Conectando a FM Kishiwada...
start "" "%vlc%" --intf dummy https://797fm.com:9443/radiolog/hcss.php
goto pause_menu

:sakura
echo Conectando a J-Pop Sakura Natsukashii...
start "" "%vlc%" --intf dummy https://listen.asiadreamradio.com/jsakura
goto pause_menu

:nhk
echo Conectando a NHK World-Japan LiVE:...
start "" "%vlc%" --intf dummy https://cdn.skygo.mn/live/disk1/NHK_World_Premium/HLSv3-FTA/NHK_World_Premium.m3u8
goto pause_menu

:galneryus	
echo Conectando a Youtube :...
start "" "%vlc%" --random --intf dummy "https://music.youtube.com/playlist?list=PLaSvFovkrtwpUrC9LKfAQRao8QTrnJcZJ&si=4K64WPBloyiyJhYU"
goto pause_menu

:pause_menu
echo.
echo [Reproduciendo...] Presiona una tecla para volver al menu.
pause > nul

taskkill /IM vlc.exe /F > nul 2>&1
goto menu