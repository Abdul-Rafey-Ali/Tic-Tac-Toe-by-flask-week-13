@echo off
setlocal
cd /d "%~dp0.."

REM Windows double-click launcher for Flask Tic-Tac-Toe
python -m pip install -r requirements.txt
python app.py

