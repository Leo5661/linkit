console.log("content");
chrome.runtime.onMessage.addListener((obj, sender, res) => {
  console.log(obj, sender);
  console.log("content is run");
  runCode();

  if (obj.isSendConnection) {
    res(true);
  }
});

function wait(ms){
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, ms)
  })
}

function isConnectBtn(btn) {
  const buttonContent = btn.getElementsByTagName("span")[0].innerText;
  if (buttonContent === "Connect" || buttonContent === "Follow") {
    return true;
  } else {
    return false;
  }
}

function selectOptions(dialog) {
  [...dialog.getElementsByTagName("button")].forEach(btn => {
    if (btn.innerText === "Other") {
      btn.click();
      console.log("other option selected");
    }
  });
}

function clickDialogConnectBtn(dialog) {
  [...dialog.getElementsByTagName("button")].forEach(btn => {
    if (btn.innerText === "Connect") {
      if (btn.disabled === false) {
        btn.click();
        console.log("connect btn in popup clicked");
      }
    }
  });
}

function closeDialog(dialog) {
  const dismissBtn = dialog.querySelector("[aria-label = Dismiss]");
  dismissBtn.click();
  console.log("dismiss btn clicked");
}

function handleDialog() {
  const dialog = document.querySelector("[role = dialog]");
  if (dialog !== null || dialog !== undefined) {
    [...dialog.getElementsByTagName("button")].forEach(btn => {
      if (btn.innerText === "Send") {
        btn.click();    
        console.log("send btn clicked");
      } else if (btn.innerText === "Connect") {
        selectOptions(dialog);
        clickDialogConnectBtn(dialog);
      } else {
        closeDialog(dialog);
      }
    });
    // await wait(2000);
    closeDialog(dialog);
  } else{
    return
  }
}

const mutationObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === "childList") {
      handleDialog();
    } 
  });
});

function performClick(btn) {
  btn.click();
  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}



async function runCode() {
  const sec = document.getElementsByClassName("entity-result__actions");
  for (let i = 0; i < sec.length; i++) {
    const btn = sec[i].getElementsByTagName("button");
    if (btn.length === 0) {
      continue;
    } else {
      if (isConnectBtn(btn[0])) {
        console.log("Staring to wait")
        await wait(3000);
        console.log("Wait complete")
        performClick(btn[0]);
      }
    }
  }
}
