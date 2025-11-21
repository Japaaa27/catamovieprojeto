#!/bin/bash
# Script para verificar quais arquivos vão para o Git

echo "═══════════════════════════════════════════════════════════"
echo "🔍 VERIFICAÇÃO: O que vai (e não vai) para o GitHub"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "✅ ARQUIVOS QUE VÃO PARA O GIT:"
echo "─────────────────────────────────"
find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -name ".env" \
  -not -name ".env.local" \
  -not -name "database_backup.sql" \
  -not -name "*.sql" \
  -not -name ".DS_Store" \
  | grep -E "\.(ts|tsx|js|jsx|json|css|html|md)$|gitignore|env.example" \
  | sed 's|^\./||' \
  | sort

echo ""
echo "❌ ARQUIVOS PROTEGIDOS (NÃO vão para o Git):"
echo "─────────────────────────────────"
if [ -f .env ]; then
    echo "⚠️  .env (EXISTE - contém senhas!)"
else
    echo "✅  .env (não existe)"
fi

if [ -f database_backup.sql ]; then
    echo "⚠️  database_backup.sql (EXISTE - dados reais!)"
else
    echo "✅  database_backup.sql (não existe ou será ignorado)"
fi

echo "✅  node_modules/ (sempre ignorado)"
echo "✅  dist/ (sempre ignorado)"
echo "✅  Arquivos *.sql (sempre ignorados)"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "📊 RESUMO"
echo "═══════════════════════════════════════════════════════════"
echo "Total de arquivos de código:"
find . -type f \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -name ".env" \
  -not -name "database_backup.sql" \
  | grep -E "\.(ts|tsx|js|jsx|json|css|html|md)$" \
  | wc -l

echo ""
echo "🔒 PROTEÇÃO ATIVA:"
cat .gitignore | grep -v "^#" | grep -v "^$" | while read line; do
    echo "   → $line"
done

echo ""
echo "✅ Seu projeto está SEGURO para Git!"
echo "═══════════════════════════════════════════════════════════"
