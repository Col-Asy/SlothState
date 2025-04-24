from tkinter import Tk, Text, Menu, filedialog

def save_file():
    file_path = filedialog.asksaveasfilename(defaultextension=".txt",
                                             filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")])
    if file_path:
        with open(file_path, "w") as file:
            file.write(text_area.get("1.0", "end-1c"))

root = Tk()
text_area = Text(root)
text_area.pack()
menu = Menu(root)
file_menu = Menu(menu, tearoff=0)
file_menu.add_command(label="Save", command=save_file)
menu.add_cascade(label="File", menu=file_menu)
root.config(menu=menu)
root.mainloop()
