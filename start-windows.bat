@echo off
echo ========================================
echo   CataMovie - Iniciando no Windows
echo ========================================
echo.

REM Verificar se .env existe
if not exist .env (
    echo [ERRO] Arquivo .env nao encontrado!
    echo.
    echo Crie um arquivo .env na raiz do projeto com:
    echo DATABASE_URL=postgresql://sua_url_aqui
    echo.
    pause
    exit /b 1
)

echo [1/3] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Criando tabelas no banco...
call npx drizzle-kit push --force
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao criar tabelas
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Populando banco com 6 filmes...
call npx tsx server/seed.ts
if %errorlevel% neq 0 (
    echo [AVISO] Falha ao popular banco (pode ja ter dados)
)

echo.
echo ========================================
echo   TUDO PRONTO! Iniciando servidor...
echo ========================================
echo.
echo Abra no navegador: http://localhost:5000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

set NODE_ENV=development
npx tsx server/index-dev.ts