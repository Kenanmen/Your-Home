@echo off
REM Script to copy images from original project to Next.js public folder (Windows)

echo Setting up images for Next.js project...

REM Create public/images directory if it doesn't exist
if not exist "public\images" mkdir "public\images"

REM Copy images from original project
REM Adjust the path based on where you run this script from

REM If running from nextjs-property-app folder:
xcopy /E /I /Y "..\assets\images\*" "public\images\"
copy /Y "..\assets\css\lgg.png" "public\images\"
copy /Y "..\assets\css\bgg.png" "public\images\"

echo.
echo Images copied successfully!
echo.
echo Images copied to public\images\:
dir "public\images\"

echo.
echo Next steps:
echo 1. Run 'npm install' to install dependencies
echo 2. Run 'npm run dev' to start the development server
echo 3. Open http://localhost:3000 in your browser

pause
