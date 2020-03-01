#!/bin/bash
if [ "$1" == "-h" ] || [ $# == 0 ]; then
 echo "Pantalla de ayuda"
 echo "notas2.sh [options] [params]"
 echo "[options]"
 echo "-h usado para mostrar la pantalla de ayuda"
 echo "-v usado para listar la cantidad de archivos en las carpetas de la carpeta ~/Documents "
 echo "[params]"
 echo "arg1 arg2 arg1, nombre de la carpeta arg2, nombre archivo"
 echo "Si arg1(carpeta) no existe creara la carpeta"
 echo "si arg2(archivo) no existe creara el archivo"
 echo "por ultimo abrira el archivo en el editor de texto nano" 
elif [ "$1" == "-v" ]; then
 lista=$(ls ~/Documents)
 for ar in $lista; do
  if [ -d ~/Documents/$ar ]; then
   numArch=$(ls ~/Documents/$ar -p| grep -v / | wc -w)
   echo "En la carpeta $ar hay $numArch archivos"
  fi 
 done
elif [ $# == 2 ]; then
 if [ ! -d ~/Documents/$1 ]; then
  mkdir ~/Documents/$1
  echo "Carpeta $1 creada"
 fi
 if [ ! -e ~/Documents/$1/$2 ]; then
  touch ~/Documents/$1/$2
 fi
 nano ~/Documents/$1/$2
fi
