import os
import sys
import time
import pyperclip

# Set up the path to your local SDK (adjust as needed)
sdk_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'terminator', 'python-sdk'))
if sdk_path not in sys.path:
    sys.path.insert(0, sdk_path)

from desktop_use import DesktopUseClient, ApiError

def automate_notepad():
    client = DesktopUseClient(base_url="http://127.0.0.1:9375")

    try:
        # 1. Open Notepad
        print("Opening Notepad...")
        client.open_application("notepad")
        time.sleep(2)  # Wait for Notepad to fully open

        # 2. Locate the Notepad window and the text editor
        print("Locating Notepad window...")
        editor = client.locator('window:Notepad')

        # 3. Type text
        print("Typing text...")
        editor.type_text("Hello from Terminator!\nThis is a Python test.")

        # 4. Open Save As dialog
        print("Opening Save As dialog...")
        editor.press_key("{Ctrl}s")

        # 5. Locate Save As dialog and type name in filename field
        print("Filling Save As dialog...")
        save_dialog = client.locator('window:"Save As"').type_text("Test.txt")
        time.sleep(2)  # Wait for the text to be typed

        # 6. Press Alt+D to focus on the directory location field
        print("Focusing on directory location field...")
        save_dialog = client.locator('title:"Save As"')
        save_dialog.press_key("{Alt}{D}")  # Press Alt+D to focus on the directory location field
        time.sleep(2)  # Wait for the key press
        file_path = r"E:/projects/SlothState/terminator-setup"
        save_dialog = client.locator('window:"Save As"').type_text(file_path)
        # time.sleep(5)  # Wait for the text to be typed
        # # save_dialog.type_text("terminator_test.txt")
        # time.sleep(5)  # Wait for the text to be typed

        save_dialog = client.locator('window:"Save As"')
        save_dialog.press_key("{Alt}{D}")  # Press Alt+D to focus on the directory location field
        save_dialog.type_text(file_path)
        save_button = save_dialog.locator('Button:"Save"')
        save_button.click()



        # save_dialog.press_key("{Enter}")  # Press Enter to save        
        # 3. Type the desired file path or name
        # file_path = r"E:\projects\SlothState\terminator-setup"
        # print(save_button)

        # print(f"File should be saved as: {file_path}")

    except ApiError as e:
        print(f"API Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    automate_notepad()
