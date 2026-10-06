# Windows Setup and Troubleshooting

This page covers three problems that often trip people up when setting up the project on Windows. The main setup steps are in the [README](../README.md). Come back here if something goes wrong.

## 1. Activating the virtual environment in PowerShell

The README tells you to run `.venv\Scripts\activate` from the `backend` folder. In PowerShell this can fail with an error like:

```text
.venv\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled on this system.
```

Windows blocks PowerShell scripts by default. This is called the *execution policy*. You have three options.

**Option A (recommended): allow scripts for your user account only.** You do not need Administrator rights, and you only need to do this once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then activate the environment again:

```powershell
.venv\Scripts\Activate.ps1
```

**Option B: allow scripts for the current PowerShell window only.** The setting is forgotten when you close the window:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Option C: use Command Prompt (cmd) instead of PowerShell.** Command Prompt does not have this restriction:

```bat
.venv\Scripts\activate.bat
```

If activation worked, your prompt starts with `(.venv)`.

## 2. `python` vs `py`

On Windows, two different commands can start Python:

- `python` only works if Python was added to your PATH during installation. If it was not, Windows may print "Python was not found" or open the Microsoft Store.
- `py` is the *Python Launcher*, which comes with the installer from python.org. It works even if PATH was not set up.

Check which one works. The version must be 3.11 or newer:

```powershell
py --version
python --version
```

If only `py` works, use it to create the virtual environment:

```powershell
py -m venv .venv
```

Once the environment is activated (you see `(.venv)`), `python` points to the virtual environment's Python. From then on, the README commands such as `python manage.py migrate` work as written.

If `python` keeps opening the Microsoft Store, either reinstall Python from python.org and tick **Add python.exe to PATH**, or turn off the Store shortcuts. To do that, search the Start menu for "Manage app execution aliases" and switch off the entries for `python.exe` and `python3.exe`.

## 3. Git line endings (LF vs CRLF)

Windows ends each line of a text file with CRLF. Linux and macOS use LF. Git can convert between them, and you may see a warning like this:

```text
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
```

This warning is harmless. It does not mean anything is broken. To avoid noisy changes where a whole file looks modified, run this once on your computer:

```powershell
git config --global core.autocrlf true
```

With this setting, Git stores files with LF in the repository and gives you CRLF files on your disk. Git for Windows often sets this for you during installation. To check, run:

```powershell
git config --global core.autocrlf
```

It should print `true`.

If `git diff` shows that every line of a file changed even though you only edited a few, line endings are the most likely cause. VS Code shows `CRLF` or `LF` in the bottom-right corner of the window. You can click it to switch.

