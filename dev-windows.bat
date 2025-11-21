@echo off
echo Iniciando CataMovie...
echo Abra: http://localhost:5000
echo Pressione Ctrl+C para parar
echo.

set NODE_ENV=development
npx tsx server/index-dev.ts

