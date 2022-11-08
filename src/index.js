import iziToast from "izitoast";

// Strings
var uwHeader = "Ultrawork Session";
var accomplishString = "What am I trying to accomplish this session?";
var importantString = "Why is this important and valuable?";
var completeString = "How will I know this is complete?";
var risksString = "Any risks / hazards? Potential distractions, procrastination, etc.";
var concreteString = "Is this concrete / measurable or subjective / ambiguous?";
var selectString = "<select><option value=\"\">Select</option><option value=\"Concrete / Measurable\">Concrete / Measurable</option><option value=\"Subjective / Ambiguous\">Subjective / Ambiguous</option></select>";
var noteworthyString = "Anything else worth noting?";
var focusString = "How long do you want to focus in this cycle?";
var cycleAccomplishString = "What am I trying to accomplish this cycle?";
var cycleStartString = "How will I get started?";
var cycleHazardString = "Current hazards?";
var counterHazardString = "Counter hazards with:";
var cycleEnergy = "Starting Energy:";
var moodEnergySelectString = "<select><option value=\"\">Select</option><option value=\"Low\">Low</option><option value=\"Medium\">Medium</option><option value=\"High\">High</option></select>";
var cycleMood = "Starting Mood:";
var cycleCompleteSelect = "<select><option value=\"\">Select</option><option value=\"No\">No</option><option value=\"Partial\">Partial</option><option value=\"Yes\">Yes</option></select>";
var cycleCompleteString = "Completed Target?";
var cycleReviewNoteworthy = "Anything else worth noting?";
var cycleReviewDistractions = "Any Distractions?";
var cycleReviewImprove = "Things to Improve for next Cycle:";
var debriefHeader = "Ultrawork Session Debrief";
var debriefDoneString = "What did I get done?";
var debriefCompareString = "How did this compare to my normal work output?";
var debriefBoggedString = "Did I get bogged down? Where?";
var debriefWellString = "What went well? How can I replicate this in the future?";
var debriefTakeawaysString = "Any other takeaways? Lessons to share with others?";
// End Strings
let cycleNumber = 1;

export default {
    onload: ({ extensionAPI }) => {
        window.roamAlphaAPI.ui.commandPalette.addCommand({
            label: "Start Ultraworking session",
            callback: () => {
                const startBlock = window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
                uw(startBlock);
            }
        });

        const args = {
            text: "ULTRAWORKING",
            help: "Start Ultraworking session",
            handler: (context) => () => {
                let startBlock = context.currentUid;
                uw(startBlock);
                return "";
            }
        };

        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.registerCommand(args);
        } else {
            document.body.addEventListener(
                `roamjs:smartblocks:loaded`,
                () =>
                    window.roamjs?.extension.smartblocks &&
                    window.roamjs.extension.smartblocks.registerCommand(args)
            );
        }
    },
    onunload: () => {
        window.roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Start Ultraworking session'
        });

        if (window.roamjs?.extension?.smartblocks) {
            window.roamjs.extension.smartblocks.unregisterCommand("ULTRAWORKING");
        };
    }
}

async function uw(startBlock) {
    await window.roamAlphaAPI.updateBlock(
        { block: { uid: startBlock, string: "**" + uwHeader + "**".toString(), open: true } });

    var accBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 0 },
        block: { string: "**" + accomplishString + "**".toString(), uid: accBlock }
    });
    let accomplish = await prompt(accomplishString, 1);
    var accBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": accBlock, order: 1 },
        block: { string: accomplish.toString(), uid: accBlock1 }
    });

    let impBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 1 },
        block: { string: "**" + importantString + "**".toString(), uid: impBlock }
    });
    var important = await prompt(importantString, 1);
    let impBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": impBlock, order: 1 },
        block: { string: important.toString(), uid: impBlock1 }
    });

    let compBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 2 },
        block: { string: "**" + completeString + "**".toString(), uid: compBlock }
    });
    var complete = await prompt(completeString, 1);
    let compBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": compBlock, order: 1 },
        block: { string: complete.toString(), uid: compBlock1 }
    });

    let riskBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 3 },
        block: { string: "**" + risksString + "**".toString(), uid: riskBlock }
    });
    var risks = await prompt(risksString, 1);
    let riskBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": riskBlock, order: 1 },
        block: { string: risks.toString(), uid: riskBlock1 }
    });

    let concreteBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 4 },
        block: { string: "**" + concreteString + "**".toString(), uid: concreteBlock }
    });
    var concrete = await prompt(concreteString, 2, selectString);
    let concreteBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": concreteBlock, order: 1 },
        block: { string: concrete.toString(), uid: concreteBlock1 }
    });

    let noteBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 5 },
        block: { string: "**" + noteworthyString + "**".toString(), uid: noteBlock }
    });
    var noteworthy = await prompt(noteworthyString, 1);
    let noteBlock1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": noteBlock, order: 1 },
        block: { string: noteworthy.toString(), uid: noteBlock1 }
    });

    let sepBlock = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": startBlock, order: 6 },
        block: { string: "---".toString(), uid: sepBlock }
    });

    cycle(startBlock, cycleNumber);
}

async function cycle(currentUID, cycleNumber) {
    var time = formatAMPM(new Date);

    let cycleHeaderUID = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": currentUID, order: ((cycleNumber * 6) + 1) },
        block: { string: "**Cycle Plan - Cycle " + cycleNumber + ":** (" + time + ")".toString(), uid: cycleHeaderUID }
    });

    let cycleHeaderUID1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 1 },
        block: { string: cycleAccomplishString.toString(), uid: cycleHeaderUID1 }
    });
    var cycleAccomplish = await prompt(cycleAccomplishString, 1);
    let cycleHeaderUID1a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID1, order: 1 },
        block: { string: cycleAccomplish.toString(), uid: cycleHeaderUID1a }
    });

    let cycleHeaderUID2 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 2 },
        block: { string: cycleStartString.toString(), uid: cycleHeaderUID2 }
    });
    var cycleStart = await prompt(cycleStartString, 1);
    let cycleHeaderUID2a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID2, order: 1 },
        block: { string: cycleStart.toString(), uid: cycleHeaderUID2a }
    });

    let cycleHeaderUID3 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 3 },
        block: { string: cycleHazardString.toString(), uid: cycleHeaderUID3 }
    });
    var cycleHazard = await prompt(cycleHazardString, 1);
    let cycleHeaderUID3a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID3, order: 1 },
        block: { string: cycleHazard.toString(), uid: cycleHeaderUID3a }
    });

    let cycleHeaderUID4 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 4 },
        block: { string: counterHazardString.toString(), uid: cycleHeaderUID4 }
    });
    var counterHazard = await prompt(counterHazardString, 1);
    let cycleHeaderUID4a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID4, order: 1 },
        block: { string: counterHazard.toString(), uid: cycleHeaderUID4a }
    });

    let cycleHeaderUID5 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 5 },
        block: { string: cycleEnergy.toString(), uid: cycleHeaderUID5 }
    });
    var energy = await prompt(cycleEnergy, 2, moodEnergySelectString);
    let cycleHeaderUID5a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID5, order: 1 },
        block: { string: energy.toString(), uid: cycleHeaderUID5a }
    });

    let cycleHeaderUID6 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 6 },
        block: { string: cycleMood.toString(), uid: cycleHeaderUID6 }
    });
    var mood = await prompt(cycleMood, 2, moodEnergySelectString);
    let cycleHeaderUID6a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID6, order: 1 },
        block: { string: mood.toString(), uid: cycleHeaderUID6a }
    });

    var cycleTime = await prompt(focusString, 1);
    let cycleHeaderUID7 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID, order: 7 },
        block: { string: "Working Notes:".toString(), uid: cycleHeaderUID7 }
    });
    let cycleHeaderUID7a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleHeaderUID7, order: 1 },
        block: { string: "", uid: cycleHeaderUID7a }
    });

    await prompt(cycleTime, 4);

    var timeC = formatAMPM(new Date);
    let cycleReviewHeader = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": currentUID, order: ((cycleNumber * 6) + 2) },
        block: { string: "**Cycle Review - Cycle " + cycleNumber + ":** (" + timeC + ")".toString(), uid: cycleReviewHeader }
    });

    let cycleReview1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReviewHeader, order: 1 },
        block: { string: cycleCompleteString.toString(), uid: cycleReview1 }
    });
    var cycleComplete = await prompt(cycleCompleteString, 2, cycleCompleteSelect);
    let cycleReview1a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReview1, order: 1 },
        block: { string: cycleComplete.toString(), uid: cycleReview1a }
    });

    let cycleReview2 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReviewHeader, order: 2 },
        block: { string: cycleReviewNoteworthy.toString(), uid: cycleReview2 }
    });
    var cycleNoteworthy = await prompt(cycleReviewNoteworthy, 1);
    let cycleReview2a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReview2, order: 1 },
        block: { string: cycleNoteworthy.toString(), uid: cycleReview2a }
    });

    let cycleReview3 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReviewHeader, order: 3 },
        block: { string: cycleReviewDistractions.toString(), uid: cycleReview3 }
    });
    var cycleDistractions = await prompt(cycleReviewDistractions, 1);
    let cycleReview3a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReview3, order: 1 },
        block: { string: cycleDistractions.toString(), uid: cycleReview3a }
    });

    let cycleReview4 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReviewHeader, order: 4 },
        block: { string: cycleReviewImprove.toString(), uid: cycleReview4 }
    });
    var cycleImprove = await prompt(cycleReviewImprove, 1);
    let cycleReview4a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": cycleReview4, order: 1 },
        block: { string: cycleImprove.toString(), uid: cycleReview4a }
    });

    let cycleReview5 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": currentUID, order: ((cycleNumber * 6) + 3) },
        block: { string: "---".toString(), uid: cycleReview5 }
    });

    let finished = await prompt("Do you want to finish or complete another cycle?", 3)
    if (finished == "another") {
        cycleNumber = parseInt(cycleNumber) + 1;
        console.info("another", cycleNumber)
        cycle(currentUID, cycleNumber);
    } else if (finished == "finish") {
        console.info("finish", cycleNumber)
        finishSession(currentUID, cycleNumber);
    }
}

async function finishSession(currentUID, cycleNumber) {
    var time = formatAMPM(new Date);
    var completedCycles = "**" + debriefHeader + " for session completed at " + time + "**";
    let debriefHeaderUID = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": currentUID, order: ((cycleNumber * 6) + 4) },
        block: { string: completedCycles.toString(), uid: debriefHeaderUID }
    });

    let debriefHeaderUID1 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID, order: 1 },
        block: { string: debriefDoneString.toString(), uid: debriefHeaderUID1 }
    });
    var debriefDone = await prompt(debriefDoneString, 1);
    let debriefHeaderUID1a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID1, order: 1 },
        block: { string: debriefDone.toString(), uid: debriefHeaderUID1a }
    });

    let debriefHeaderUID2 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID, order: 2 },
        block: { string: debriefCompareString.toString(), uid: debriefHeaderUID2 }
    });
    var debriefCompare = await prompt(debriefCompareString, 1);
    let debriefHeaderUID2a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID2, order: 1 },
        block: { string: debriefCompare.toString(), uid: debriefHeaderUID2a }
    });

    let debriefHeaderUID3 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID, order: 3 },
        block: { string: debriefBoggedString.toString(), uid: debriefHeaderUID3 }
    });
    var debriefBogged = await prompt(debriefBoggedString, 1);
    let debriefHeaderUID3a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID3, order: 1 },
        block: { string: debriefBogged.toString(), uid: debriefHeaderUID3a }
    });

    let debriefHeaderUID4 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID, order: 4 },
        block: { string: debriefWellString.toString(), uid: debriefHeaderUID4 }
    });
    var debriefWell = await prompt(debriefWellString, 1);
    let debriefHeaderUID4a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID4, order: 1 },
        block: { string: debriefWell.toString(), uid: debriefHeaderUID4a }
    });

    let debriefHeaderUID5 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID, order: 5 },
        block: { string: debriefTakeawaysString.toString(), uid: debriefHeaderUID5 }
    });
    var debriefTakeaways = await prompt(debriefTakeawaysString, 1);
    let debriefHeaderUID5a = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": debriefHeaderUID5, order: 1 },
        block: { string: debriefTakeaways.toString(), uid: debriefHeaderUID5a }
    });
    let debriefHeaderUID6 = window.roamAlphaAPI.util.generateUID();
    await window.roamAlphaAPI.createBlock({
        location: { "parent-uid": currentUID, order: ((cycleNumber * 6) + 5) },
        block: { string: "---".toString(), uid: debriefHeaderUID6 }
    });
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

async function prompt(string, type, selectString) {
    if (type == 1) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                drag: false,
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "Ultraworking",
                message: string,
                position: "center",
                inputs: [
                    [
                        '<input type="text" placeholder="">',
                        "keyup",
                        function (instance, toast, input, e) {
                        },
                        true,
                    ],
                ],
                buttons: [
                    [
                        "<button><b>Confirm</b></button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve(inputs[0].value);
                        },
                        false,
                    ],
                    [
                        "<button>Cancel</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                        },
                    ],
                ],
                onClosing: function (instance, toast, closedBy) { },
                onClosed: function (instance, toast, closedBy) { },
            });
        })
    } else if (type == 2) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                drag: false,
                timeout: 20000,
                close: false,
                overlay: true,
                title: "Ultraworking",
                message: string,
                position: 'center',
                inputs: [
                    [selectString, 'change', function (instance, toast, select, e) { }]
                ],
                buttons: [
                    ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {
                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        resolve(inputs[0].options[inputs[0].selectedIndex].value);
                    }, false], // true to focus
                    [
                        "<button>Cancel</button>",
                        function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                        },
                    ],
                ]
            });
        })
    } else if (type == 3) {
        return new Promise((resolve) => {
            iziToast.question({
                theme: 'light',
                color: 'black',
                layout: 2,
                drag: false,
                timeout: 20000,
                close: false,
                overlay: true,
                displayMode: 2,
                id: "question",
                title: "Ultraworking",
                message: string,
                position: "center",
                buttons: [
                    [
                        "<button>Another Cycle</button>",
                        async function (instance, toast, button, e, inputs) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("another");
                        },
                        false,
                    ],
                    [
                        "<button>Finish</button>",
                        async function (instance, toast, button, e) {
                            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                            resolve("finish");
                        },
                    ],
                ],
                onClosing: function (instance, toast, closedBy) { },
                onClosed: function (instance, toast, closedBy) { },
            });
        })
    } else if (type == 4) {
        var duration = parseInt(string) * 60 * 1000;
        return new Promise((resolve) => {
            iziToast.show({
                id: null,
                class: '',
                title: '',
                titleColor: '',
                titleSize: '',
                titleLineHeight: '',
                message: string + " min",
                messageColor: '',
                messageSize: '',
                messageLineHeight: '',
                backgroundColor: '',
                theme: 'light', // dark
                color: '', // blue, red, green, yellow
                icon: '',
                iconText: '',
                iconColor: '',
                iconUrl: null,
                image: '',
                imageWidth: 50,
                maxWidth: null,
                zindex: null,
                layout: 1,
                balloon: false,
                close: true,
                closeOnEscape: false,
                closeOnClick: false,
                displayMode: 0, // once, replace
                position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                target: '',
                targetFirst: true,
                timeout: duration,
                rtl: false,
                animateInside: true,
                drag: true,
                pauseOnHover: true,
                resetOnHover: false,
                progressBar: true,
                progressBarColor: '',
                progressBarEasing: 'linear',
                overlay: false,
                overlayClose: false,
                overlayColor: 'rgba(0, 0, 0, 0.6)',
                transitionIn: 'fadeInUp',
                transitionOut: 'fadeOut',
                transitionInMobile: 'fadeInUp',
                transitionOutMobile: 'fadeOutDown',
                buttons: {},
                inputs: {},
                onOpening: function () { },
                onOpened: function () { },
                onClosing: function () { },
                onClosed: function () {
                    resolve("completed cycle");
                }
            });
        })
    }
}