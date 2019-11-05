import kivy

kivy.require('1.11.1')  # Set to your Kivy version
from kontinuum.core.app import KApp

# be sure to update the following file every time you add a widget
import app.widgets.widget_list

class MainApp(KApp):
    pass

MainApp().run()
