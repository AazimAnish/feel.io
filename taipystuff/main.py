import taipy as tp
from taipy import Config, Core, Gui
import pandas
import requests
################################################################
#            Configure application                             #
################################################################
def build_message(name):
    return f"Hello {name}!"


# A first data node configuration to model an input name.
input_name_data_node_cfg = Config.configure_data_node(id="input_name")
# A second data node configuration to model the message to display.
message_data_node_cfg = Config.configure_data_node(id="message")
# A task configuration to model the build_message function.
build_msg_task_cfg = Config.configure_task("build_msg", build_message, input_name_data_node_cfg, message_data_node_cfg)
# The scenario configuration represents the whole execution graph.
scenario_cfg = Config.configure_scenario("scenario", task_configs=[build_msg_task_cfg])

################################################################
#            Design graphical interface                        #
################################################################

input_name = "Taipy"
message = None


def submit_scenario(state):
    state.scenario.input_name.write(state.input_name)
    state.scenario.submit()
    state.message = scenario.message.read()


x = requests.post("https://nodeformakeaton.onrender.com/lasthours", json = {"hours":10})
sample = x.json()
#print(sample)
data = {
    "Moods":[x["mood"] for x in sample],
    "Frequency":[x["count"] for x in sample]
}
page = """
# Bar - Simple




"""
x = requests.post("https://nodeformakeaton.onrender.com/normalmoods")
sample = x.json()
data2 = {
    "Moods":sample[0].keys(),
    "Frequency":sample[0].values()
}


x30 = requests.post("https://nodeformakeaton.onrender.com/happy", json = {"hours":24*30}).json()[0]["joyCount"]
x15 = requests.post("https://nodeformakeaton.onrender.com/happy", json = {"hours":24*15}).json()[0]["joyCount"]
x7 = requests.post("https://nodeformakeaton.onrender.com/happy", json = {"hours":24*7}).json()[0]["joyCount"]
x1 = requests.post("https://nodeformakeaton.onrender.com/happy", json = {"hours":24*1}).json()[0]["joyCount"]

Days = [
    "30 days ago",
    "15 days ago",
    "7 days ago",
    "Yesterday"
]
Values = [
    str(x30),
    str(x15),
    str(x7),
    str(x1)
]

data3 = {
    "Days": Days,
    "Values":Values
}


page = """
# Last 6 Hours
<|{data}|chart|type=pie|labels=Moods|values=Frequency|>
# Normal Emotions (Last 30 days)
<|{data2}|chart|type=pie|values=Frequency|labels=Moods|>
# Happiness Meter
<|{data3}|chart|mode=lines|x=Days|y[1]=Values|line[1]=dash|>
"""

if __name__ == "__main__":
    ################################################################
    #            Instantiate and run Core service                  #
    ################################################################
    Core().run()

    ################################################################
    #            Manage scenarios and data nodes                   #
    ################################################################
    scenario = tp.create_scenario(scenario_cfg)

    ################################################################
    #            Instantiate and run Gui service                   #
    ################################################################

    Gui(page).run()


