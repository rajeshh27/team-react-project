@echo off
REM Run MongoDB, frontend (Vite) and backend (Express) together

REM Change to the folder where this script lives
cd /d "%~dp0"

echo.
echo ==========================================
echo  Starting MongoDB (Windows service)
echo ==========================================
echo.

REM Try to start MongoDB Windows service (name is usually "MongoDB")
net start MongoDB >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
  echo MongoDB service started or already running.
) ELSE (
  echo Could not start MongoDB service automatically.
  echo - Make sure MongoDB is installed as a Windows service named "MongoDB"
  echo - Or start mongod manually in another terminal before using this script.
)

REM Install dependencies if node_modules is missing (optional, quick check)
IF NOT EXIST "node_modules" (
  echo Installing npm dependencies...
  npm install
)

echo.
echo ==========================================
echo  Starting frontend and backend
echo  (using "npm run dev:fullstack")
echo ==========================================
echo.

npm run dev:fullstack

pause

