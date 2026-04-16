# 📻 RadioJP - Japanese Immersion Media Player

Un reproductor multimedia súper ligero basado en la terminal de Windows (Batch) diseñado para facilitar la **inmersión pasiva** en el idioma japonés. Utiliza VLC en segundo plano para reproducir emisoras de radio locales de Japón, NHK World y listas de reproducción de YouTube sin consumir recursos gráficos.

Ideal para estudiantes de japonés que siguen métodos de inmersión (como AJATT o Refold) y quieren mantener el idioma sonando de fondo mientras usan la PC.

## ✨ Características

* [cite_start]**Terminal UI:** Interfaz limpia y rápida directamente en la consola de comandos.
* [cite_start]**Reloj JST Integrado:** Calcula y muestra automáticamente la hora actual en Japón (JST) basándose en tu hora local[cite: 2].
* [cite_start]**Modo Oculto (Dummy):** Aprovecha el parámetro `--intf dummy` de VLC para reproducir el audio sin abrir la ventana del reproductor[cite: 3].
* [cite_start]**Variedad de Medios:** Soporta radios (City Pop, estaciones locales), televisión en vivo (NHK) y listas de reproducción directamente desde YouTube[cite: 3].
* [cite_start]**Cierre Limpio:** Al presionar cualquier tecla para volver al menú, el script se encarga de cerrar el proceso de VLC automáticamente (`taskkill`)[cite: 4].

## 🛠️ Requisitos

Para que este script funcione correctamente necesitas:
1. Sistema Operativo **Windows**.
2. **VLC Media Player** instalado en su ruta por defecto (`C:\Program Files\VideoLAN\VLC\vlc.exe`).

## 🚀 Uso

1. Clona este repositorio o descarga el archivo `radioJP.bat`.
2. Haz doble clic en `radioJP.bat`.
3. Selecciona el número de la estación que quieres escuchar y presiona Enter.
4. [cite_start]Para detener la reproducción y elegir otra estación, vuelve a la consola y presiona cualquier tecla[cite: 4].
