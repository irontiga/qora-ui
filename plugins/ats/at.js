Burst = new BurstHelper();

Polymer({
    is: 'at-app',
    properties: {
        ats: {
            type: Array,
            value: function(){ return []; },
            notify: true,
            reflectToAttribute: true
        },
        loading: {
            trype: Boolean,
            value: true
        },
        atCount:{
            type: Number,
            value: 0
        },
        drawnAts:{
            type: Number,
            value: 0
        },
        atShowOptions:{
            type: Array,
            value: [
                "All",
                "Active",
                "Funded",
                "Not Funded"
            ]
        },
        atSorted: {
            type: Boolean,
            value: false
        },
        donateItem: {
            type: Object,
            value: {}
        },
        donateDialogueOpened: {
            type: Boolean,
            value: false
        }
    },
    
    _donateButton: function(e){
        this.donateItem = e.model.item;
        
        this.donateDialogueOpened = true;
    },
    
    _niceNumber : function(number){
        return number.toLocaleString('en-US');
    },
    
    _sortAts : function(e){
        if(this.atSorted === true){
            this.ats = this.ats.sort(function(a,b){
                if(a.atData.name < b.atData.name){
                    return 1;
                }
                else{
                    return -1;
                }
            });
            this.atSorted = false;
        }
        else{
            this.ats = this.ats.sort(function(a,b){
                if(a.atData.name > b.atData.name){
                    return 1;
                }
                else{
                    return -1;
                }
            });
            this.atSorted = true;
        }
        
        var oldAts = this.ats;
        this.ats = [];
        this.ats = oldAts;
        
        console.log(this.ats);
    },
    
    _showAts: function(e){
        this.loading = true;
        var showOnly = e.model.item;
        var ats = this.ats;
        this.ats = [];
        switch(showOnly){
            case "Active":
                for(var i=0; ats.length>i;i++){
                    if(ats[i].funded != 1){
                        ats[i].show = true;
                    }
                    else{
                        ats[i].show = false;
                    }
                }
                break;
            case "Funded":
                for(var i=0; ats.length>i;i++){
                    if(ats[i].funded == 1){
                        ats[i].show = true;
                    }
                    else{
                        ats[i].show = false;
                    }
                }
                break;
            case "Not Funded":
                for(var i=0; ats.length>i;i++){
                    if(ats[i].funded == 2){
                        ats[i].show = true;
                    }
                    else{
                        ats[i].show = false;
                    }
                }
                break;
            default:
                for(var i=0; ats.length>i;i++){
                    ats[i].show = true;
                }
        }
        
        setTimeout(function(){
            this.ats = ats;
            this.loading = false; 
        }.bind(this),200);       
    },


    //////////////////////////
    ///////////////////////////
    /////////////////////

    ready: function(){
        Burst.request("burstApiCall", {
            requestType: "getATIds"
        }, function(response){
            var data = JSON.parse(response.data)
            getATs.bind(this)(data);
        }.bind(this));
    }
});

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
        data = JSON.parse(response.data);
        if (data.description.toLowerCase().indexOf('crowdfund') > -1 ){
            this.atCount += 1;
            getBlockHeight.bind(this)(data);
        }
    }.bind(this));
}

function getBlockHeight(atData){
    Burst.request("burstApiCall", {
        requestType: "getBlockchainStatus"
    }, function(response){
        data = JSON.parse(response.data);
        getTransaction.bind(this)(data.numberOfBlocks, atData);
    }.bind(this));
}

function getTransaction(blockHeight, atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString:atData.machineData.substring(1* 8, 1 *8+8)
    }, function(response){
        data = JSON.parse(response.data);
        getDecision.bind(this)(data.hex2long, blockHeight, atData);
    }.bind(this));
}

function getDecision(transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(1 * 16, 1 * 16 + 16)
    }, function(response){
        data = JSON.parse(response.data);
        getTargetAmount.bind(this)(data.hex2long, transaction, blockHeight, atData);
    }.bind(this));
}

function getTargetAmount(decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(3 * 16, 3 * 16 + 16)
    }, function(response){
        data = JSON.parse(response.data);
        getGatheredAmount.bind(this)(data.hex2long , decision, transaction, blockHeight, atData);
    }.bind(this));

}
function getGatheredAmount(targetAmount,decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(2 * 16, 2 * 16 + 16)
    }, function(response){
        data = JSON.parse(response.data);
        getFunded.bind(this)(data.hex2long, targetAmount , decision, transaction, blockHeight, atData);
    }.bind(this));

}
function getFunded(gatheredAmount, targetAmount, decision,transaction,blockHeight,atData){
    Burst.request("burstApiCall", {
        requestType: "getATLong",
        hexString: atData.machineData.substring(7 * 16, 7 * 16 + 16)
    }, function(response){
        data = JSON.parse(response.data);
        drawAT.bind(this)(data.hex2long, gatheredAmount, targetAmount , decision, transaction, blockHeight, atData);
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
        show: true
    });
    
    var oldAts = this.ats;
    this.ats = [];
    this.ats = oldAts;
    
    this.drawnAts += 1;
    
    if(this.drawnAts >= this.atCount){
        this.loading = false;
    }

    /*var html = '<div class="col l4 crowd">' +
            '<div class="crowdbox"> ' +
            '<h5 class="head">'+atData.name+'</h5>'+
            '<hr>'+
            '<div class="crowdtext">' + descr + '</div>'+

            '<div class="state" style="display:none">'+ fundedStr +'</div>'+
            '<hr>'+
            '<div class="progress">'+
            '<span class="progress-value" style="color:'+ color +';left:' + ratioText.toFixed(2) + '% "> <span class="'+ icon +'"></span><span>  ' + ratioDesc +'</span></span>'+

            '<div class="progress-bar" style="width:' + ratio + '%"></div>' +
            '</div>' +  

            '<div class="text-amount">'+
            '<div class="row">'+
            '<div class="col l5">'+
            '   <span style='+
            '   "font-size:1.2em;color:black">' + atBalance + '</span>'+
            '   <span style="font-size:0.9em;color:gray">pledged out of ' + tarAmount +'</span>'+
            '</div>'+

            '<div class="col l4">'+
            '   <span><span style='+
            '   "font-size:0.9em;color:gray">'+ finished +' </span><span style='+
            '   "font-size:1.2em;color:black">'+ ends +'</span> <span style='+
            '   "font-size:0.9em;color:gray">'+ blocks +'</span> </span>'+
            '</div>'+

            '<div class="col l3">'+
            '   <span><span style='+
            '   "font-size:1.2em;color:black">'+ ratio.toFixed(2) +'%</span> <span style='+
            '   "font-size:0.9em;color:gray">funded</span></span>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<hr>'+

            '<div class="row">'+
            '<div class="col l6"><span style='+
            '"font-size:1.2em;color:black">Creator: </span> <span style='+
            '"font-size:0.9em;color:gray">'+atData.creatorRS+'</span></div>'+

            '<div class="col l6">'
        if (buttonState!='disabled')
        {

            html = html + '<a data-toggle="modal" data-at-id="' + atData.at + 
                '" data-total-amount="1000" title="Add this item" class="open-buyTicket btn btn-primary btn-sm btn-block" href="#buyTicket"><i class="glyphicon glyphicon-send" style="vertical-align:middle;"></i> '+ buttonStr +' </a>'
        }
        html = html + '</div>'+
            '</div>'+
            '</div>'+
            '</div>'

        //$('#at-block').append(html);
        //filter("ongoing");
        console.log(html);*/
}