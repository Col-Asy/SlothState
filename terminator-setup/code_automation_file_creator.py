# File: code_automation_file_creator.py

import os
import time
import logging
import PySimpleGUI as sg
from desktop_use import DesktopUseClient, ApiError, ConnectionError

# --- GUI Configuration --- #
sg.theme('DarkBlue3')
FONT = ('Arial', 12)
NOTE_FONT = ('Arial', 11, 'italic')

def create_gui():
    """Creates the main application window"""
    note_text = (
        "Note: After this file is created, import it into the page you want to track.\n"
        "For example:\n"
        "   import useTracking from './useTracking';"
    )
    layout = [
        [sg.Text(note_text, font=NOTE_FONT, text_color='yellow', background_color='#283B5B')],
        [sg.Text('Save Location:', font=FONT), 
         sg.Input(key='-PATH-', font=FONT, size=(30,1)),
         sg.FolderBrowse(font=FONT)],
        [sg.Text('File Name:', font=FONT), 
         sg.Input(key='-FILENAME-', font=FONT, default_text='useTracking.ts', size=(30,1))],
        [sg.Text('Terminator Server Port:', font=FONT),
         sg.Input(key='-PORT-', font=FONT, default_text='9375', size=(10,1))],
        [sg.ProgressBar(100, orientation='h', size=(40,20), key='-PROGRESS-', 
                       bar_color=('green', 'white'))],
        [sg.Button('Create File', font=FONT), sg.Exit(font=FONT)]
    ]
    return sg.Window('Terminator File Creator', layout, finalize=True)

def run_automation(save_dir, filename, port, window):
    """Executes the Notepad automation workflow"""
    try:
        base_url = f'http://127.0.0.1:{port}'
        client = DesktopUseClient(base_url=base_url)
        
        # Phase 1: Application Launch
        window['-PROGRESS-'].update(10)
        client.open_application("Notepad")
        time.sleep(2)
        
        # Phase 2: Text Entry
        window['-PROGRESS-'].update(30)
        notepad_window = client.locator("window:Untitled - Notepad")
        editor = notepad_window.locator("role:Edit")
        editor.type_text("change the text here")
        
        # Phase 3: Save Dialog Handling
        window['-PROGRESS-'].update(50)
        editor.press_key("{Ctrl}s")
        time.sleep(1)
        
        # Phase 4: Path Navigation
        window['-PROGRESS-'].update(70)
        save_dialog = client.locator("window:Save As")
        
        # Clear existing path and type new location
        address_bar = save_dialog.locator("role:Edit[Name='Address']")
        address_bar.click()
        address_bar.press_key("{Ctrl}a{Del}")  # Select all + delete
        address_bar.type_text(save_dir)
        address_bar.press_key("{Enter}")
        time.sleep(1)
        
        # Phase 5: Final Save
        window['-PROGRESS-'].update(90)
        filename_field = save_dialog.locator("role:Edit[Name='File name:']")
        filename_field.type_text(filename)
        save_button = save_dialog.locator("name:Save")
        save_button.click()
        
        window['-PROGRESS-'].update(100)
        return True
        
    except ConnectionError:
        sg.popup_error("Server Connection Failed", 
                      "Ensure Terminator server is running on the specified port.")
        return False
    except ApiError as e:
        sg.popup_error("Automation Failed", f"UI interaction error:\n{e}")
        return False
    except Exception as e:
        sg.popup_error("Unexpected Error", f"{type(e).__name__}: {str(e)}")
        return False

def main():
    window = create_gui()
    
    while True:
        event, values = window.read()
        
        if event in (sg.WIN_CLOSED, 'Exit'):
            break
            
        if event == 'Create File':
            # Validate inputs
            if not values['-PATH-']:
                sg.popup_error("Invalid Path", "Please select a save directory")
                continue
            if not values['-FILENAME-']:
                sg.popup_error("Invalid Name", "Please enter a filename")
                continue
            if not values['-PORT-'] or not values['-PORT-'].isdigit():
                sg.popup_error("Invalid Port", "Please enter a valid port number")
                continue
            
            # Execute automation
            success = run_automation(
                save_dir=values['-PATH-'],
                filename=values['-FILENAME-'],
                port=values['-PORT-'],
                window=window
            )
            
            # Show result
            if success:
                sg.popup_ok("Success", 
                           f"File saved to:\n{os.path.join(values['-PATH-'], values['-FILENAME-'])}")
                window['-PROGRESS-'].update(0)
                
    window.close()

if __name__ == "__main__":
    logging.basicConfig(level=logging.WARNING)  # Reduce SDK verbosity
    main()
