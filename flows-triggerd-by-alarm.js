// Fetch all advanced flows from Homey
const advancedFlows = await Homey.flow.getAdvancedFlows();

// Array to store flows triggered by alarms
const alarmTriggeredFlows = [];

// Loop through each advanced flow to check for alarm triggers
Object.entries(advancedFlows).forEach(([flowId, flow]) => {
    // Loop through each card in the flow
    Object.values(flow.cards).forEach(card => {
        // Check if the card is a trigger and if it's an alarm trigger
        if (card.type === "trigger" && card.ownerUri === "homey:manager:alarms") {
            // Extract the flow name and alarm information
            alarmTriggeredFlows.push({
                flowName: flow.name,
                alarmName: card.args.alarm.name,
                alarmId: card.args.alarm.id
            });
        }
    });
});

// Output the list of alarm-triggered flows
if (alarmTriggeredFlows.length > 0) {
    console.log("Flows triggered by alarms:");
    alarmTriggeredFlows.forEach(flow => {
        console.log(`Flow Name: ${flow.flowName}`);
        console.log(`Alarm Name: ${flow.alarmName}`);
        console.log(`Alarm ID: ${flow.alarmId}`);
        console.log('---');
    });
} else {
    console.log("No flows triggered by alarms were found.");
}
