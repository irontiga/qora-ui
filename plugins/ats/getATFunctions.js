function getATs(data){
    for (var i = 0; i < data.atIds.length; i++){
        getAT.bind(this)(data.atIds[i]);
    }
}


function getAT(atId){
    Burst.request("burstApiCall", {
        requestType: "getAT",
        at: atId
    }, function(response){
        if (response.description.toLowerCase().indexOf('crowdfund') > -1 ){
            this.atCount += 1;
            getBlockHeight.bind(this)(response);
        }
    }.bind(this));
}

function getBlockHeight(atData){
    Burst.request("burstApiCall", {
        requestType: "getBlockchainStatus"
    }, function(response){
        getTransaction.bind(this)(response.numberOfBlocks, atData);
    }.bind(this));
}

function getTransaction(blockHeight, atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString:atData.machineData.substring(1* 8, 1 *8+8)
    }, function(response){
        getDecision.bind(this)(response.hex2long, blockHeight, atData);
    }.bind(this));
}

function getDecision(transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(1 * 16, 1 * 16 + 16)
    }, function(response){
        getTargetAmount.bind(this)(response.hex2long, transaction, blockHeight, atData);
    }.bind(this));
}

function getTargetAmount(decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(3 * 16, 3 * 16 + 16)
    }, function(response){
        getGatheredAmount.bind(this)(response.hex2long , decision, transaction, blockHeight, atData);
    }.bind(this));

}
function getGatheredAmount(targetAmount,decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(2 * 16, 2 * 16 + 16)
    }, function(response){
        getFunded.bind(this)(response.hex2long, targetAmount , decision, transaction, blockHeight, atData);
    }.bind(this));

}
function getFunded(gatheredAmount, targetAmount, decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(7 * 16, 7 * 16 + 16)
    }, function(response){
        drawAT.bind(this)(response.hex2long, gatheredAmount, targetAmount , decision, transaction, blockHeight, atData);
    }.bind(this));

}
function drawAT(funded, gatheredAmount, targetAmount, decision, transaction,blockHeight,atData){
    var tarAmount = 0;
    var atBalance = 0;
    if ( targetAmount.length > 8 ){
        tarAmount = parseInt( targetAmount.substring( 0,targetAmount.length - 8 ) );
    }

    if ( atData.balanceNQT.length > 8 ){
        atBalance = parseInt( atData.balanceNQT.substring( 0,atData.balanceNQT.length - 8 ) );
    }
    if ( funded == 1 || funded == 2){
        if ( gatheredAmount.length > 8 ){
            atBalance = parseInt( gatheredAmount.substring( 0,gatheredAmount.length - 8 ) );
        }
    }
    var ratio = atBalance/tarAmount * 100;
    var ratioText = ratio - 15;
    var ratioDesc = ratio.toFixed(1) + '%';
    if (ratio>100){
        ratioText = 80;
        ratioDesc = 'Funded!';
    }


    var blocks = 'blocks to go';
    var descr = atData.description.substr(0,atData.description.length - 9 );
    var ends = parseInt(transaction) + parseInt(decision) - parseInt(blockHeight);
    var diff = parseInt(blockHeight) - parseInt(transaction);
    var fundedStr = 'ongoing';
    var color = 'white';
    var icon = 'glyphicon glyphicon-signal';
    var finished = '';
    var buttonStr = 'Pledge';
    var buttonState = '';
    if ( funded == 2 ){
        fundedStr = 'false';
        ratioDesc = 'Not funded!';
        icon = 'glyphicon glyphicon-remove-sign';
        ratioText = 40;
        color = 'black';
        finished = 'finished';
        blocks = 'blocks ago';
        buttonState = 'disabled';

    }
    else if ( funded == 1){
        fundedStr = 'true';
        ratioDesc = 'Successfully Funded!';
        icon = 'glyphicon glyphicon-ok-sign';
        ratioText = 40;
        blocks = 'blocks ago';
        finished = 'finished';
        buttonStr = 'Donate';
    }



    if (funded === 0 && ends < 0 ){
        ends = 'NaN';
        tarAmount = 'NaN';
    }
    else{
        ends = Math.abs(ends);
    }

    this.push('ats',{
        atData: atData,
        descr: descr,
        funded: funded,
        ratio: ratio,
        ratioText: ratioText,
        ratioDesc: ratioDesc,
        atBalance: atBalance,
        tarAmount: tarAmount,
        finished: finished,
        ends: ends,
        blocks: blocks,
        show: true,
        selectedTab: 0
    });

    var oldAts = this.ats;
    this.ats = [];
    this.ats = oldAts;

    this.drawnAts += 1;

    if(this.drawnAts >= this.atCount){
        this.loading = false;
    }
}