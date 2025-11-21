@echo off
chcp 65001 >nul
echo.
echo ================================================
echo   🎬 CataMovie - Instalação Windows
echo ================================================
echo.

echo [1/6] Instalando dependências...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependências
    pause
    exit /b %errorlevel%
)
echo ✓ Dependências instaladas
echo.

echo [2/6] Instalando biblioteca dotenv...
call npm install dotenv
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dotenv
    pause
    exit /b %errorlevel%
)
echo ✓ Dotenv instalado
echo.

echo [3/6] Configurando suporte .env nos arquivos...

REM Criar backups
if not exist db\index.ts.bak copy db\index.ts db\index.ts.bak >nul 2>&1
if not exist server\index-dev.ts.bak copy server\index-dev.ts server\index-dev.ts.bak >nul 2>&1
if not exist server\seed.ts.bak copy server\seed.ts server\seed.ts.bak >nul 2>&1

REM Adicionar import dotenv no db/index.ts se não existir
findstr /C:"dotenv/config" db\index.ts >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "(Get-Content 'db\index.ts') | ForEach-Object { if ($_ -match '^import') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Select-Object -First 1000 | Set-Content 'db\index.ts.tmp'"
    move /y db\index.ts.tmp db\index.ts >nul
    echo ✓ db/index.ts configurado
) else (
    echo ✓ db/index.ts já configurado
)

REM Adicionar import dotenv no server/index-dev.ts se não existir
findstr /C:"dotenv/config" server\index-dev.ts >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "(Get-Content 'server\index-dev.ts') | ForEach-Object { if ($_ -match '^import') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Select-Object -First 1000 | Set-Content 'server\index-dev.ts.tmp'"
    move /y server\index-dev.ts.tmp server\index-dev.ts >nul
    echo ✓ server/index-dev.ts configurado
) else (
    echo ✓ server/index-dev.ts já configurado
)

REM Adicionar import dotenv no server/seed.ts se não existir
findstr /C:"dotenv/config" server\seed.ts >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "(Get-Content 'server\seed.ts') | ForEach-Object { if ($_ -match '^import') { 'import \"dotenv/config\";'; $_ } else { $_ } } | Select-Object -First 1000 | Set-Content 'server\seed.ts.tmp'"
    move /y server\seed.ts.tmp server\seed.ts >nul
    echo ✓ server/seed.ts configurado
) else (
    echo ✓ server/seed.ts já configurado
)

echo.
echo [4/6] Criando arquivo .env...
if not exist .env (
    echo DATABASE_URL=postgresql://neondb_owner:npg_6zPq7NhdCLsK@ep-calm-wave-a8oaybb6-pooler.eastus2.azure.neon.tech/CataMovie?sslmode=require> .env
    echo ✓ Arquivo .env criado
) else (
    echo ✓ Arquivo .env já existe
)

echo.
echo [5/6] Verificando configuração do banco...
type .env
echo.

echo [6/6] Populando banco com 6 filmes...
call npx tsx server/seed.ts
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao popular banco de dados
    echo Verifique se a DATABASE_URL está correta no arquivo .env
    pause
    exit /b %errorlevel%
)

echo.
echo ================================================
echo   ✅ INSTALAÇÃO CONCLUÍDA!
echo ================================================
echo.
echo O projeto está pronto para uso!
echo.
echo Para iniciar o servidor:
echo   $env:NODE_ENV="development"; npx tsx server/index-dev.ts
echo.
echo Acesse: http://localhost:5000
echo.
echo Pressione qualquer tecla para iniciar o servidor agora...
pause >nul

echo.
echo ================================================
echo   🚀 Iniciando servidor...
echo ================================================
echo.
echo Pressione Ctrl+C para parar
echo.

set NODE_ENV=development
npx tsx server/index-dev.ts