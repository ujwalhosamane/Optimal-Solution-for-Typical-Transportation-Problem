let penaltyRow = [];
let penaltyColumn = [];
let demandMatrixFixed = []; 
let supplyMatrixFixed = [];
let resultMatrix = [];
let costMatrix = [];
function result() {
    let entered = true;
    const demandsInput = document.querySelector('input[name="demands"]');
    demands = parseInt(demandsInput.value);
    const supplysInput = document.querySelector('input[name="supply"]');
    supply = parseInt(supplysInput.value);
    for(let i =1; i <= demands; i++){
        let variable1 = "demand"+i;
        const demandsMatrixInput = parseInt(document.querySelector('input[name="'+ variable1 +'"]').value);
        if((!Number.isInteger(demandsMatrixInput)) || demandsMatrixInput <=0){
            alert('Please enter valid inputs');
            return;
        }
        for( let j = 1;j <= supply; j++){
            let variable2 = "supply"+j;
            let variable3 = "matrix"+i+j;
            const supplyMatrixInput = parseInt(document.querySelector('input[name="'+ variable2 +'"]').value);
            if(!Number.isInteger(supplyMatrixInput) || supplyMatrixInput <=0){
                alert('Please enter valid inputs');
                return;
            }
            const CostMAtrixInput = parseInt(document.querySelector('input[name="'+ variable3 +'"]').value);
            if(!Number.isInteger(CostMAtrixInput) || CostMAtrixInput <= 0){
                alert('Please enter valid inputs');
                return;
            }
        }
    }
    let row = 0;
    let col = 0;
    let demandMatrix = []; 
    let supplyMatrix = [];
    let resultSum = 0;
    let demandSum = 0;
    let supplySum = 0;
    let steps = 1;
    
    var resultDuplicateDiv = document.querySelector("#result-div");
    var initialSolutionDuplicateDiv = document.querySelector("#initial-solution");
    var proceedDuplicateDiv = document.querySelector("#proceed");
    var optimizationDuplicateDiv = document.querySelector("#optimizationDiv");

    if (resultDuplicateDiv){
        resultDuplicateDiv.parentNode.removeChild(resultDuplicateDiv);
    }
    if(initialSolutionDuplicateDiv){
        initialSolutionDuplicateDiv.parentNode.removeChild(initialSolutionDuplicateDiv);
    }
    if(proceedDuplicateDiv){
        proceedDuplicateDiv.parentNode.removeChild(proceedDuplicateDiv);
    }
    if(optimizationDuplicateDiv){
        optimizationDuplicateDiv.parentNode.removeChild(optimizationDuplicateDiv);
    }

    var resultDiv = document.createElement("div");
    resultDiv.id = "result-div";
    resultDiv.style.display = "flex";
    resultDiv.style.flexDirection = "Column";
    resultDiv.style.alignItems = "center";


    var allocation = document.createElement("h1");
    allocation.innerHTML = "Allocation";
    allocation.style.marginBottom = "3%";

    resultDiv.appendChild(allocation);

    for(var i = 0; i < demands; i++){
        const demandMatrixInput = document.querySelector('input[name="demand'+Number(i+1)+'"]');
        demandMatrix[i] = parseInt(demandMatrixInput.value);
        demandMatrixFixed[i] = demandMatrix[i];
        demandSum += demandMatrix[i];
    }
    
    for(var i = 0; i < supply; i++){
        const supplyMatrixInput = document.querySelector('input[name="supply'+Number(i+1)+'"]');
        supplyMatrix[i] = parseInt(supplyMatrixInput.value);
        supplyMatrixFixed[i] = supplyMatrix[i];
        supplySum += supplyMatrix[i];
    }

    //unbalanced
    if(supplySum > demandSum)
    {
        demandMatrix[demands] = supplySum-demandSum;
        var unbalancedTP = document.createElement('label');
        unbalancedTP.innerHTML = "<center>since  supply and demand are not equal given Transportation problem is unbalanced.</center><br><center>Hence we are adding extra row with demand value as " + Number(supplySum-demandSum)+"</center>";
        unbalancedTP.style.marginBottom = "3%";
        resultDiv.appendChild(unbalancedTP);
        demandSum +=supplySum-demandSum;
    }
    else if(demandSum > supplySum)
    {
        supplyMatrix[supply] = demandSum-supplySum;
        var unbalancedTP = document.createElement('label');
        unbalancedTP.innerHTML = "<center>since  supply and demand are not equal given Transportation problem is unbalanced.</center><br><center>Hence we are adding extra column with supply value as " + Number(demandSum-supplySum)+"</center>";
        unbalancedTP.style.marginBottom = "3%";
        resultDiv.appendChild(unbalancedTP);
        supplySum+=demandSum-supplySum;
    }
    for(var i = 0; i < demands; i++){
        costMatrix[i] = [];
        for(var j =0; j < supply; j++){
            const costMatrixInput = document.querySelector('input[name="matrix'+Number(i+1)+Number(j+1)+'"]');
            costMatrix[i][j] = parseInt(costMatrixInput.value);
        }
    }
    for(var i=0; i<demands;i++){
        resultMatrix[i] = [];
        for(var j = 0; j<supply; j++){
            resultMatrix[i][j] = 0;
        }
    }

    //unbalanced
    if(supplyMatrix[supply]){
        for(var i = 0; i <demands; i++){
            resultMatrix[i][supply] = 0;
            costMatrix[i][supply]=0;
        }
        supply++;
    }else if(demandMatrix[demands]){
        resultMatrix[demands] = [];
        costMatrix[demands] = [];
        for(var j = 0; j<supply; j++){
            resultMatrix[demands][j] = 0;
            costMatrix[demands][j] = 0;
        }
        demands++;
    }

    var iteration = document.createElement("label");
        iteration.innerHTML = "<b>Iteration  :  0 </b>";
        var resultTable = document.createElement("table");
        resultTable.id = "result-table";
        resultTable.style.margin = "3% 0 10% 0";
        resultTable.style.border = "2px solid black";
        resultTable.style.borderCollapse = "collapse";
    for(var x = 0; x <= demands+1; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+1; y++){
                    var resultCell = document.createElement("td");
                    resultCell.style.minWidth = "90px";
                    resultCell.style.minHeight = "40px";
                    resultCell.style.border = "2px solid black";
                    resultCell.style.borderCollapse = "collapse";
                    if (x==0 && y>0 && y<= supply) {
                        resultCell.textContent = "Factory - " + y;
                        resultCell.style.textAlign = "center";
                    }
                    else if (x==0 && y==supply+1){
                        resultCell.textContent = "Demands";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x== demands+1){
                        resultCell.textContent = "Supplies";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x>0 && x<=demands) {
                        resultCell.textContent = "Warehouse - " + x;
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==0 && y==0){
                        resultCell.textContent = "";
                        resultCell.style.textAlign = "center";
                    }
                    else if(x>0 && y>0 && x<=demands && y<=supply){
                        resultCell.textContent = resultMatrix[x-1][y-1];
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==demands+1 && y>0 && y<=supply){
                        resultCell.textContent = supplyMatrix[y-1];
                        resultCell.style.textAlign = "center";
                    }else if(y==supply+1 && x>0 && x<=demands){
                        resultCell.textContent = demandMatrix[x-1];
                        resultCell.style.textAlign = "center";
                    }
                    resultRow.appendChild(resultCell);
                }
                resultTable.appendChild(resultRow);
            }
            resultDiv.appendChild(resultTable);
    const algorithmInput = document.getElementById("alg-select");
    const algorithmName = algorithmInput.options[algorithmInput.selectedIndex].value;
    if(algorithmName == "north-west"){
        while (row < demands && col < supply){
            let i = row;
            let j = col;

            let k = (demandMatrix[i] < supplyMatrix[j] ? demandMatrix[i] : supplyMatrix[j]);

            demandMatrix[i] -= k;
            supplyMatrix[j] -= k;
            resultMatrix[i][j] = k;

            if(demandMatrix[i] == 0)
                row++;
            if(supplyMatrix[j] == 0)
                col++;

            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration "+ steps + " : </b>";
            
            steps++;

            resultDiv.appendChild(iteration);

            var resultTable = document.createElement("table");
            resultTable.id = "result-table";
            resultTable.style.margin = "3% 0 10% 0";
            resultTable.style.border = "2px solid black";
            resultTable.style.borderCollapse = "collapse";
            for(var x = 0; x <= demands+1; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+1; y++){
                    var resultCell = document.createElement("td");
                    resultCell.style.minWidth = "90px";
                    resultCell.style.minHeight = "40px";
                    resultCell.style.border = "2px solid black";
                    resultCell.style.borderCollapse = "collapse";
                    if (x==0 && y>0 && y<= supply) {
                        resultCell.textContent = "Factory - " + y;
                        resultCell.style.textAlign = "center";
                    }
                    else if (x==0 && y==supply+1){
                        resultCell.textContent = "Demands";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x== demands+1){
                        resultCell.textContent = "Supplies";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x>0 && x<=demands) {
                        resultCell.textContent = "Warehouse - " + x;
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==0 && y==0){
                        resultCell.textContent = "";
                        resultCell.style.textAlign = "center";
                    }
                    else if(x>0 && y>0 && x<=demands && y<=supply){
                        resultCell.textContent = resultMatrix[x-1][y-1];
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==demands+1 && y>0 && y<=supply){
                        resultCell.textContent = supplyMatrix[y-1];
                        resultCell.style.textAlign = "center";
                    }else if(y==supply+1 && x>0 && x<=demands){
                        resultCell.textContent = demandMatrix[x-1];
                        resultCell.style.textAlign = "center";
                    }
                    resultRow.appendChild(resultCell);
                }
                resultTable.appendChild(resultRow);
            }
            resultDiv.appendChild(resultTable);
        }
    }
    
    else if(algorithmName == "row-min"){
        while (row < demands && col < supply){
            let i = row;
            let j = col;

            let min = 999;
            let q = 0;
            let loc = q;

            while (q < supply) {
                if (min > costMatrix[i][q] && resultMatrix[i][q] == 0 && demandMatrix[i] != 0 && supplyMatrix[q] != 0) {
                    min = costMatrix[i][q];
                    loc = q;
                }
                q++;
            }

            let k = (demandMatrix[i] < supplyMatrix[loc] ? demandMatrix[i] : supplyMatrix[loc]);

            demandMatrix[i] -= k;
            supplyMatrix[loc] -= k;
            resultMatrix[i][loc] = k;

            if(demandMatrix[i] == 0)
                row++;
            if(supplyMatrix[loc] == 0)
                col++;
            
            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration "+ steps + " : </b>";
            
            steps++;

            resultDiv.appendChild(iteration);

            var resultTable = document.createElement("table");
            resultTable.style.margin = "3% 0 10% 0";
            resultTable.style.border = "2px solid black";
            resultTable.style.borderCollapse = "collapse";
            for(var x = 0; x <= demands+1; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+1; y++){
                    var resultCell = document.createElement("td");
                    resultCell.style.minWidth = "90px";
                    resultCell.style.minHeight = "40px";
                    resultCell.style.border = "2px solid black";
                    resultCell.style.borderCollapse = "collapse";
                    if (x==0 && y>0 && y<= supply) {
                        resultCell.textContent = "Factory - " + y;
                        resultCell.style.textAlign = "center";
                    }
                    else if (x==0 && y==supply+1){
                        resultCell.textContent = "Demands";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x== demands+1){
                        resultCell.textContent = "Supplies";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x>0 && x<=demands) {
                        resultCell.textContent = "Warehouse - " + x;
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==0 && y==0){
                        resultCell.textContent = "";
                        resultCell.style.textAlign = "center";
                    }
                    else if(x>0 && y>0 && x<=demands && y<=supply){
                        resultCell.textContent = resultMatrix[x-1][y-1];
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==demands+1 && y>0 && y<=supply){
                        resultCell.textContent = supplyMatrix[y-1];
                        resultCell.style.textAlign = "center";
                    }else if(y==supply+1 && x>0 && x<=demands){
                        resultCell.textContent = demandMatrix[x-1];
                        resultCell.style.textAlign = "center";
                    }
                    resultRow.appendChild(resultCell);
                }
                resultTable.appendChild(resultRow);
            }
            resultDiv.appendChild(resultTable);
        }
    }

    else if(algorithmName == "col-min"){
        while (row < demands && col < supply){
            let i = row;
            let j = col;

            let min = 999;
            let q = 0;
            let loc = q;

            while (q < demands) {
                if (min > costMatrix[q][j] && resultMatrix[q][j] == 0 && demandMatrix[q] != 0 && supplyMatrix[j] != 0) {
                    min = costMatrix[q][j];
                    loc = q;
                }
                q++;
            }

            let k = (demandMatrix[loc] < supplyMatrix[j] ? demandMatrix[loc] : supplyMatrix[j]);

            demandMatrix[loc] -= k;
            supplyMatrix[j] -= k;
            resultMatrix[loc][j] = k;

            if(demandMatrix[loc] == 0)
                row++;
            if(supplyMatrix[j] == 0)
                col++;
            
            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration "+ steps + " : </b>";
            
            steps++;

            resultDiv.appendChild(iteration);

            var resultTable = document.createElement("table");
            resultTable.style.margin = "3% 0 10% 0";
            resultTable.style.border = "2px solid black";
            resultTable.style.borderCollapse = "collapse";
            for(var x = 0; x <= demands+1; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+1; y++){
                    var resultCell = document.createElement("td");
                    resultCell.style.minWidth = "90px";
                    resultCell.style.minHeight = "40px";
                    resultCell.style.border = "2px solid black";
                    resultCell.style.borderCollapse = "collapse";
                    if (x==0 && y>0 && y<= supply) {
                        resultCell.textContent = "Factory - " + y;
                        resultCell.style.textAlign = "center";
                    }
                    else if (x==0 && y==supply+1){
                        resultCell.textContent = "Demands";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x== demands+1){
                        resultCell.textContent = "Supplies";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x>0 && x<=demands) {
                        resultCell.textContent = "Warehouse - " + x;
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==0 && y==0){
                        resultCell.textContent = "";
                        resultCell.style.textAlign = "center";
                    }
                    else if(x>0 && y>0 && x<=demands && y<=supply){
                        resultCell.textContent = resultMatrix[x-1][y-1];
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==demands+1 && y>0 && y<=supply){
                        resultCell.textContent = supplyMatrix[y-1];
                        resultCell.style.textAlign = "center";
                    }else if(y==supply+1 && x>0 && x<=demands){
                        resultCell.textContent = demandMatrix[x-1];
                        resultCell.style.textAlign = "center";
                    }
                    resultRow.appendChild(resultCell);
                }
                resultTable.appendChild(resultRow);
            }
            resultDiv.appendChild(resultTable);
        }
    }

    else if(algorithmName == "least-cost-entry"){
        while (demandSum > 0 && supplySum > 0){
            let i = 0;
            let j = 0;

            let min = 999;
            let loc1 = i;
            let loc2 = j;

            for(i = 0; i < demands ; i++) {
                for(j = 0; j < supply; j++) {
                    if (min > costMatrix[i][j] && resultMatrix[i][j] == 0 && demandMatrix[i] !== 0 && supplyMatrix[j] !== 0) {
                        min = costMatrix[i][j];
                        loc1 = i;
                        loc2 = j;
                    }
                }
            }
            let min_val = -1;
            let difference;
            if(demandMatrix[loc1] < supplyMatrix[loc2]){
                min_val = demandMatrix[loc1] * costMatrix[loc1][loc2];
                difference = supplyMatrix[loc2] - demandMatrix[loc1];
            } else{
                min_val = supplyMatrix[loc2] * costMatrix[loc1][loc2];
                difference = demandMatrix[loc1] - supplyMatrix[loc2];
            }
            for(i = 0; i < demands; i++){
                for(j = 0; j < supply; j++) {
                    if (min == costMatrix[i][j] && resultMatrix[i][j] == 0 && demandMatrix[i] !== 0 && supplyMatrix[j] !== 0 ){
                        if(demandMatrix[i] < supplyMatrix[j]){
                            if(min_val<=(demandMatrix[i] * costMatrix[i][j])){
                                if(min_val==(demandMatrix[i] * costMatrix[i][j]) && (difference>(supplyMatrix[j] - demandMatrix[i]))){
                                    loc1 = i;
                                    loc2 = j;
                                    difference = (supplyMatrix[j] - demandMatrix[i]);
                                } else {
                                    min_val = demandMatrix[i] * costMatrix[i][j];
                                    loc1 = i;
                                    loc2 = j;
                                    difference = (supplyMatrix[j] - demandMatrix[i]);
                                }
                            }
                        } else{
                            if(min_val<=(supplyMatrix[j] * costMatrix[i][j])){
                                if(min_val==(supplyMatrix[j] * costMatrix[i][j]) && difference>(demandMatrix[i] - supplyMatrix[j])){
                                    loc1 = i;
                                    loc2 = j;
                                    difference = demandMatrix[i] - supplyMatrix[j];
                                } else {
                                    min_val = supplyMatrix[j] * costMatrix[i][j];
                                    loc1 = i;
                                    loc2 = j;
                                    difference = demandMatrix[i] - supplyMatrix[j];
                                }
                            }
                        }
                    }   
                }
            }

            let k = (demandMatrix[loc1] < supplyMatrix[loc2] ? demandMatrix[loc1] : supplyMatrix[loc2]);

            demandMatrix[loc1] -= k;
            supplyMatrix[loc2] -= k;
            resultMatrix[loc1][loc2] = k;
            demandSum -= k;
            supplySum -= k;

            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration "+ steps + " : </b>";
            
            steps++;

            resultDiv.appendChild(iteration);

            var resultTable = document.createElement("table");
            resultTable.style.margin = "3% 0 10% 0";
            resultTable.style.border = "2px solid black";
            resultTable.style.borderCollapse = "collapse";
            for(var x = 0; x <= demands+1; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+1; y++){
                    var resultCell = document.createElement("td");
                    resultCell.style.minWidth = "90px";
                    resultCell.style.minHeight = "40px";
                    resultCell.style.border = "2px solid black";
                    resultCell.style.borderCollapse = "collapse";
                    if (x==0 && y>0 && y<= supply) {
                        resultCell.textContent = "Factory - " + y;
                        resultCell.style.textAlign = "center";
                    }
                    else if (x==0 && y==supply+1){
                        resultCell.textContent = "Demands";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x== demands+1){
                        resultCell.textContent = "Supplies";
                        resultCell.style.textAlign = "center";
                    }
                    else if (y==0 && x>0 && x<=demands) {
                        resultCell.textContent = "Warehouse - " + x;
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==0 && y==0){
                        resultCell.textContent = "";
                        resultCell.style.textAlign = "center";
                    }
                    else if(x>0 && y>0 && x<=demands && y<=supply){
                        resultCell.textContent = resultMatrix[x-1][y-1];
                        resultCell.style.textAlign = "center";
                    }
                    else if(x==demands+1 && y>0 && y<=supply){
                        resultCell.textContent = supplyMatrix[y-1];
                        resultCell.style.textAlign = "center";
                    }else if(y==supply+1 && x>0 && x<=demands){
                        resultCell.textContent = demandMatrix[x-1];
                        resultCell.style.textAlign = "center";
                    }
                    resultRow.appendChild(resultCell);
                }
                resultTable.appendChild(resultRow);
            }
            resultDiv.appendChild(resultTable);
        }
    }

    else if (algorithmName == "vogel-method"){
        while (demandSum > 0 && supplySum > 0){
            penaltyRow[steps-1] = [];
            penaltyColumn[steps-1] = [];
            for (let i = 0; i < demands; i++) {
                let min1 = Infinity;
                let min2 = Infinity;
                for (let j = 0; j < supply; j++) {
                    if ((min1 > costMatrix[i][j] || min2 > costMatrix[i][j]) && resultMatrix[i][j] == 0 && demandMatrix[i] != 0 && supplyMatrix[j] != 0) {
                        if (min2 > min1) {
                            min2 = costMatrix[i][j];
                        } else {
                            min1 = costMatrix[i][j];
                        }
                    }
                }
                if(min1 != 999 && min2 !=999){
                    penaltyRow[steps-1][i] = min1 > min2 ? min1 - min2 : min2 - min1;
                }
                else if(demandMatrix[i] == 0){
                    penaltyRow[steps-1][i] = 0;
                }
                else{
                    penaltyRow[steps-1][i] = min1 == 999 ? min2 : min1;
                }
                if(isNaN(penaltyRow[steps-1][i])){
                    penaltyRow[steps-1][i] = 0;
                }
            }
            
            for (let j = 0; j < supply; j++) {
                let min1 = Infinity;
                let min2 = Infinity;
                for (let i = 0; i < demands; i++) {
                    if ((min1 > costMatrix[i][j] || min2 > costMatrix[i][j]) && resultMatrix[i][j] == 0 && demandMatrix[i] != 0 && supplyMatrix[j] != 0) {
                        if (min2 > min1) {
                            min2 = costMatrix[i][j];
                        } else {
                            min1 = costMatrix[i][j];
                        }
                    }
                }
                if(min1 != 999 && min2 !=999){
                    penaltyColumn[steps-1][j] = min1 > min2 ? min1 - min2 : min2 - min1;
                }
                else if(supplyMatrix[j] == 0){
                    penaltyColumn[steps-1][j] = 0;
                }
                else{
                    penaltyColumn[steps-1][j] = min1 == 999 ? min2 : min1;
                }
                if(isNaN(penaltyColumn[steps-1][j])){
                    penaltyColumn[steps-1][j] = 0;
                }
                
            }
            let maxPenalty = -1;
            let maxPenaltyVal = 0;
            let vRow, vColumn;
            let isPenaltyRow = false;
            let maxPenaltyIndex = -1;
            for(let i = 0; i < demands; i++){
                if(maxPenalty <= penaltyRow[steps-1][i]){
                    if(maxPenalty == penaltyRow[steps-1][i]){
                        let minCostPresent = Infinity;
                        let minCostPresentI, minCostPresentJ;
                        let minCostPrevious = Infinity;
                        let minCostPreviousI, minCostPreviousJ;
                        for(let j = 0; j < supply; j++){
                            if(resultMatrix[i][j] == 0 && supplyMatrix[j] != 0 && demandMatrix[i] != 0 && minCostPresent > costMatrix[i][j]){
                                minCostPresent = costMatrix[i][j];
                                minCostPresentI = i;
                                minCostPresentJ = j;
                            }
                            if(resultMatrix[maxPenaltyIndex][j] == 0 && supplyMatrix[j] != 0 && demandMatrix[maxPenaltyIndex] != 0 && minCostPrevious > costMatrix[maxPenaltyIndex][j]){
                                minCostPrevious = costMatrix[maxPenaltyIndex][j];
                                minCostPreviousI = maxPenaltyIndex;
                                minCostPreviousJ = j;
                            }
                        }
                        let allocatePrevious = Math.min(demandMatrix[minCostPreviousI], supplyMatrix[minCostPreviousJ]);
                        let allocatePresent = Math.min(demandMatrix[minCostPresentI], supplyMatrix[minCostPresentJ]);
                        if(allocatePresent > allocatePrevious){
                            maxPenalty = penaltyRow[steps-1][i];
                            isPenaltyRow = true;
                            maxPenaltyIndex = i;
                        }

                    }
                    else{
                        maxPenalty = penaltyRow[steps-1][i];
                        isPenaltyRow = true;
                        maxPenaltyIndex = i;
                    }
                }
            }

            for(let j = 0; j < supply; j++){
                if(maxPenalty <= penaltyColumn[steps-1][j]){
                    if(maxPenalty == penaltyColumn[steps-1][j]){
                        let minCostPresent = Infinity;
                        let minCostPresentI, minCostPresentJ;
                        let minCostPrevious = Infinity;
                        let minCostPreviousI, minCostPreviousJ;
                        if(isPenaltyRow){
                            for(let q = 0; q < supply; q++){
                                if(resultMatrix[maxPenaltyIndex][q] == 0 && supplyMatrix[q] != 0 && demandMatrix[maxPenaltyIndex] != 0 && minCostPrevious > costMatrix[maxPenaltyIndex][q]){
                                    minCostPrevious = costMatrix[maxPenaltyIndex][q];
                                    minCostPreviousI = maxPenaltyIndex;
                                    minCostPreviousJ = q;
                                }
                            }
                            for(let i = 0; i < demands; i++){
                                if(resultMatrix[i][j] == 0 && supplyMatrix[j] != 0 && demandMatrix[i] != 0 && minCostPresent > costMatrix[i][j]){
                                    minCostPresent = costMatrix[i][j];
                                    minCostPresentI = i;
                                    minCostPresentJ = j;
                                }
                            }
                            if(minCostPresentI == minCostPreviousI && minCostPresentJ == minCostPreviousJ){
                                maxPenalty = penaltyColumn[steps-1][j];
                                isPenaltyRow = false;
                                maxPenaltyIndex = j;
                            }
                            else{
                                let allocatePrevious = Math.min(demandMatrix[minCostPreviousI], supplyMatrix[minCostPreviousJ]);
                                let allocatePresent = Math.min(demandMatrix[minCostPresentI], supplyMatrix[minCostPresentJ]);
                                if(allocatePresent >= allocatePrevious){
                                    maxPenalty = penaltyColumn[steps-1][j];
                                    isPenaltyRow = false;
                                    maxPenaltyIndex = j;
                                }
                            }
                        }
                        else{
                            for(let i = 0; i < demands; i++){
                                if(resultMatrix[i][j] == 0 && supplyMatrix[j] != 0 && demandMatrix[i] != 0 && minCostPresent > costMatrix[i][j]){
                                    minCostPresent = costMatrix[i][j];
                                    minCostPresentI = i;
                                    minCostPresentJ = j;
                                }
                                if(resultMatrix[i][maxPenaltyIndex] == 0 && supplyMatrix[maxPenaltyIndex] != 0 && demandMatrix[i] != 0 && minCostPrevious > costMatrix[i][maxPenaltyIndex]){
                                    minCostPrevious = costMatrix[i][maxPenaltyIndex];
                                    minCostPreviousI = i;
                                    minCostPreviousJ = maxPenaltyIndex;
                                }
                            }
                            let allocatePrevious = Math.min(demandMatrix[minCostPreviousI], supplyMatrix[minCostPreviousJ]);
                            let allocatePresent = Math.min(demandMatrix[minCostPresentI], supplyMatrix[minCostPresentJ]);
                            if(allocatePresent >= allocatePrevious){
                                maxPenalty = penaltyColumn[steps-1][j];
                                isPenaltyRow = false;
                                maxPenaltyIndex = j;
                            }
                        }
                    }
                    else{
                        maxPenalty = penaltyColumn[steps-1][j];
                        isPenaltyRow = false;
                        maxPenaltyIndex = j;
                    }
                }
            }
            if(isPenaltyRow){
                let minCostNow = Infinity;
                for(let j = 0; j < supply; j++){
                    if(resultMatrix[maxPenaltyIndex][j] == 0 && supplyMatrix[j] != 0  && demandMatrix[maxPenaltyIndex] != 0 && minCostNow >= costMatrix[maxPenaltyIndex][j]){
                        minCostNow = costMatrix[maxPenaltyIndex][j];
                        vRow = maxPenaltyIndex;
                        vColumn = j;
                    }
                }
            }
            else{
                let minCostNow = Infinity;
                for(let i = 0; i < demands; i++){
                    if(resultMatrix[i][maxPenaltyIndex] == 0 && supplyMatrix[maxPenaltyIndex] != 0  && demandMatrix[i] != 0 && minCostNow >= costMatrix[i][maxPenaltyIndex]){
                        minCostNow = costMatrix[i][maxPenaltyIndex];
                        vRow = i;
                        vColumn = maxPenaltyIndex;
                    }
                }
            }
            
            const k = (demandMatrix[vRow] < supplyMatrix[vColumn]) ? demandMatrix[vRow] : supplyMatrix[vColumn];
            demandMatrix[vRow] -= k;
            supplyMatrix[vColumn] -= k;
            console.log(k);
            resultMatrix[vRow][vColumn] = k;
            demandSum -= k;
            supplySum -= k;

            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration "+ steps + " : </b>";
            
            steps++;

            resultDiv.appendChild(iteration);

            var resultTable = document.createElement("table");
            resultTable.style.margin = "3% 0 10% 0";
            resultTable.style.border = "2px solid black";
            resultTable.style.borderCollapse = "collapse";
            for(var x = 0; x <= demands+steps; x++) {
                var resultRow = document.createElement("tr");

                for(var y = 0; y <= supply+steps; y++){
                    if(!(demandSum <= 0 && supplySum <= 0 && (x>demands+1 || y>supply+1))){
                        var resultCell = document.createElement("td");
                        resultCell.style.minWidth = "90px";
                        resultCell.style.minHeight = "40px";
                        resultCell.style.border = "2px solid black";
                        resultCell.style.borderCollapse = "collapse";
                        if (x==0 && y>0 && y<= supply) {
                            resultCell.textContent = "Factory - " + y;
                            resultCell.style.textAlign = "center";
                        }
                        else if (x==0 && y==supply+1){
                            resultCell.textContent = "Demands";
                            resultCell.style.textAlign = "center";
                        }
                        else if (y==0 && x== demands+1){
                            resultCell.textContent = "Supplies";
                            resultCell.style.textAlign = "center";
                        }
                        else if (y==0 && x>0 && x<=demands) {
                            resultCell.textContent = "Warehouse - " + x;
                            resultCell.style.textAlign = "center";
                        }
                        else if(x==0 && y==0){
                            resultCell.textContent = "";
                            resultCell.style.textAlign = "center";
                        }
                        else if(x>0 && y>0 && x<=demands && y<=supply){
                            resultCell.textContent = resultMatrix[x-1][y-1];
                            resultCell.style.textAlign = "center";
                        }
                        else if(x==demands+1 && y>0 && y<=supply){
                            resultCell.textContent = supplyMatrix[y-1];
                            resultCell.style.textAlign = "center";
                        }else if(y==supply+1 && x>0 && x<=demands){
                            resultCell.textContent = demandMatrix[x-1];
                            resultCell.style.textAlign = "center";
                        }
                        else if(x>demands+1 && y==0){
                            resultCell.textContent = "Penalty Column - "+ Number(x-demands-1);
                            resultCell.style.textAlign = "center";
                        }
                        else if(x==0 && y>supply+1){
                            resultCell.textContent = "Penalty Row - " + Number(y-supply-1);
                            resultCell.style.textAlign = "center";
                        }
                        else if(x>demands+1 && y>0 && y<=supply && demandSum > 0 && supplySum > 0){
                            if(penaltyColumn[x-demands-2][y-1] != 0 && penaltyColumn[x-demands-2][y-1] != Infinity){
                                resultCell.textContent = penaltyColumn[x-demands-2][y-1];
                                resultCell.style.textAlign = "center";
                            }
                            else{
                                resultCell.textContent = "-";
                                resultCell.style.textAlign = "center";
                            }
                            
                        }
                        else if(y>supply+1 && x>0 && x<=demands && demandSum > 0 && supplySum > 0){
                            if(penaltyRow[y-supply-2][x-1] != 0 && penaltyRow[y-supply-2][x-1] != Infinity){
                                resultCell.textContent = penaltyRow[y-supply-2][x-1];
                                resultCell.style.textAlign = "center";
                            }
                            else{
                                resultCell.textContent = "-";
                                resultCell.style.textAlign = "center";
                            }
                        }
                        resultRow.appendChild(resultCell);
                    }
                    resultTable.appendChild(resultRow);
                }
            }
            resultDiv.appendChild(resultTable);
        }
    }

    else{
        console.log("Error");
    }

    var initialSolution = document.createElement("label");
    initialSolution.innerHTML = "<b>Initial Solution = </b>";
    initialSolution.style.marginLeft = "3%";
    initialSolution.style.marginBottom = "2%";

    var initialSolutionDiv = document.createElement("div");
    initialSolutionDiv.appendChild(initialSolution);
    initialSolutionDiv.id = "initial-solution";
    var itr = 1;
    for(var i = 0; i<demands; i++){
        for(var j = 0; j<supply; j++){
            if(resultMatrix[i][j] != 0){
                resultSum += resultMatrix[i][j] * costMatrix[i][j];
                var product = document.createElement("label");
                if (itr != 1)
                var string = " + ("+resultMatrix[i][j]+ " * "+costMatrix[i][j]+ ") ";
                else
                var string = " ("+resultMatrix[i][j]+ " * "+costMatrix[i][j]+ ") ";

                if(itr%10 != 0){
                    product.innerHTML = string;
                } else {
                    var productBr = document.createElement("br");
                    initialSolutionDiv.appendChild(productBr);
                    product.innerHTML = string;
                    product.style.marginLeft = "16%";
                }
                itr++;
                initialSolutionDiv.appendChild(product);
            }
        }
    }
    var sumBr = document.createElement("br");
    initialSolutionDiv.appendChild(sumBr);
    
    var sum = document.createElement("label");
    sum.innerHTML = "<br><b style='margin-left: 3%;'>Initial Solution = </b>" + resultSum;
    sum.style.marginLeft = "3%";

    initialSolutionDiv.appendChild(sum);
    resultDiv.style.fontSize = "20px";

    initialSolutionDiv.style.fontSize = "20px";


    var ibfsDiv = document.getElementById("ibfs");
    ibfsDiv.appendChild(resultDiv);
    ibfsDiv.appendChild(initialSolutionDiv);

    var proceed = document.createElement("div");
    proceed.id = "proceed";
    proceed.style.margin = "2% 0 2% 3%";

    var proceedLabel = document.createElement("label");
    proceedLabel.innerHTML = "Wanna proceed to Optimal Solution?";

    var yesBtn = document.createElement("button");
    var yes = document.createTextNode("Yes");
    yesBtn.appendChild(yes);
    yesBtn.onclick = optimal;
    
    var noBtn = document.createElement("button");
    var no = document.createTextNode("No");
    noBtn.appendChild(no);
    noBtn.onclick = end;

    proceed.appendChild(proceedLabel);
    proceed.appendChild(yesBtn);
    proceed.appendChild(noBtn);
    ibfsDiv.appendChild(proceed);
}

let ifDegeneracy;
let sourceI, sourceJ;
function optimal(){
    var proceedDuplicateDiv = document.querySelector("#proceed");
    if(proceedDuplicateDiv){
        proceedDuplicateDiv.parentNode.removeChild(proceedDuplicateDiv);
    }
    let optimalDiv = document.createElement("div");
    optimalDiv.id = "optimizationDiv";
    optimalDiv.style.display = "flex";
    optimalDiv.style.flexDirection = "Column";
    optimalDiv.style.alignItems = "center";

    var optimization = document.createElement("h1");
    optimization.innerHTML = "Optimization";
    optimization.style.marginBottom = "3%";

    optimalDiv.appendChild(optimization);
    optimalDiv.style.fontSize = "20px";

    let step = 0;
    let minThetaI, minThetaJ;
    let pre;
    optimal: while(true){
        ifDegeneracy = 0;
        step++;
        let isOptimal = true;
        let dotMatrix = [];
        let visited = [];
        let theta = [];
        let loop = [];
        let entryI, entryJ;
        console.log("Enter optimal function");

        
        if(pre == step){
        }
        else{
            var iteration = document.createElement("label");
            iteration.innerHTML = "<b>Iteration  : "+step+"   </b>";
            iteration.id ="iteration"+step;
            optimalDiv.appendChild(iteration);
        }

        //counting degeneracy
        for(let i = 0; i < demands; i++){
            for(let j = 0; j < supply; j++){
                if(resultMatrix[i][j] != 0){
                    ifDegeneracy++;
                }
            }
        }
        console.log(ifDegeneracy);
        //non-degenerate
        if(ifDegeneracy == (demands + supply - 1)){

            var nonDegenerateBR = document.createElement("br");
            optimalDiv.appendChild(nonDegenerateBR);

            var nonDegenerate = document.createElement("label");
            nonDegenerate.innerHTML = "Since m+n-1 allocation (i.e., "+ifDegeneracy+"); we proceed for optimality.";
            optimalDiv.appendChild(nonDegenerate);

            console.log("Entered non degenerate");
            //dot matrix
            [dotMatrix, isOptimal, entryI, entryJ, theta, visited] = dMatrix(ifDegeneracy, optimalDiv);
            if(isOptimal){
                var Dij = document.createElement("label");
                Dij.innerHTML = "Since dij >= 0; Solution is optimal";
                optimalDiv.appendChild(Dij);
            }
            else{
                var Dij = document.createElement("label");
                Dij.innerHTML = "Since dij is negative; Solution under test is not optimal";
                optimalDiv.appendChild(Dij);
            }
            if(!isOptimal){
                theta[entryI][entryJ] = "+";
                visited[entryI][entryJ] = true;
                
                let initialIndices = possible(entryI, entryJ);
                sourceI = entryI;
                sourceJ = entryJ;

                let found;
                indices: for (const [row, column] of initialIndices){
                    /* if(isNaN(dotMatrix[row][column])){
                        theta[row][column] = "-";
                    }*/
                    let initialPlus = 0;
                    let initialMinius = 0;
                    for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                if(theta[i][j] == "+"){
                                    initialPlus++;
                                }
                                if(theta[i][j] == "-"){
                                    initialMinius++;
                                }
                            }
                    }
                    //console.log("Initial Theta", theta);
                    count = 0;
                    [found, theta, loop] = route(entryI, entryJ, row, column, visited, dotMatrix, theta, initialPlus, initialMinius, loop);
                    if(found){
                        loop.push([entryI, entryJ]);
                        break indices;
                    }
                    else{
                        while (loop.length > 0) {
                            const poppedElement = loop.pop();
                        }
                        for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                theta[i][j] = 0;
                            }
                        }
                        theta[entryI][entryJ] = "+";
                    }
                }

                var optimizationTable4 = document.createElement("table");
                optimizationTable4.id = "optimization-table1";
                optimizationTable4.style.margin = "3% 0 5% 0";
                optimizationTable4.style.borderCollapse = "collapse";

                var optimizationTable4Caption = document.createElement("caption");
                optimizationTable4Caption.innerText = "Theta Values";
                optimizationTable4.appendChild(optimizationTable4Caption);
                
                for(let i = 0; i < demands; i++){
                    var resultRow = document.createElement("tr");
                    for(let j = 0; j < supply; j++){
                        var resultCell = document.createElement("td");
                        if(isNaN(theta[i][j])){
                            resultCell.innerText = theta[i][j];
                        }
                        else{
                            resultCell.innerText = "";
                        }
                        resultRow.appendChild(resultCell);
                    }
                    optimizationTable4.appendChild(resultRow);
                }
                optimalDiv.appendChild(optimizationTable4);

                var break1 = document.createElement("br");
                optimalDiv.appendChild(break1);
                var Loop = document.createElement("label");
                        let len = loop.length;
                        let co = 0;
                        let ind = -1;
                        let str = "Loop: "
                        let initialx, initialy;
                        while(co < len){
                            let poped = loop.pop(); 
                            let [x, y] = poped;
                            if(co == 0){
                                str += "("+Number(x+1)+", "+Number(y+1)+")";
                                [initialx, initialy] = poped;
                            }
                            else{
                                str += " - ("+Number(x+1)+", "+Number(y+1)+")";
                            }
                            co++;
                        }
                        str += " - ("+Number(initialx+1)+", "+Number(initialy+1)+")";
                        Loop.innerHTML = str;
                        optimalDiv.appendChild(Loop);
                        var break2 = document.createElement("br");
                optimalDiv.appendChild(break2);

                let isDelta = false;
                let isDeltaInNegativeTheta = false;
                let deltaInNegativeThetaI, deltaInNegativeThetaJ;
                for(let i = 0; i < demands; i++){
                    for(let j = 0; j < supply; j++){
                        if(isNaN(resultMatrix[i][j])){
                            if(theta[i][j] == "-"){
                                isDeltaInNegativeTheta = true;
                                deltaInNegativeThetaI = i;
                                deltaInNegativeThetaJ = j;
                            }
                            isDelta = true;
                        }
                    }
                }
                console.log("isDeltaInNegativeTheta", isDeltaInNegativeTheta);
                console.table(theta);
                console.table(resultMatrix);

                if(found){
                    let minTheta = Infinity;
                    let cost = Infinity;
                    if(isDelta){
                        if(isDeltaInNegativeTheta){
                            console.log("Entered here 1");
                            for(let i = 0; i < demands; i++){
                                for(let j = 0; j < supply; j++){
                                    if(theta[i][j] == "+" && resultMatrix[i][j] == 0){
                                        resultMatrix[i][j] = "Delta";
                                    }
                                    if(resultMatrix[i][j] == "Delta" && theta[i][j] == "-"){
                                        resultMatrix[i][j] = 0;
                                    }
                                }
                            }
                            console.table(resultMatrix);
                        }else{
                            console.log("Entered here 2");
                            for(let i = 0; i < demands; i++){
                                for(let j = 0; j < supply; j++){
                                    if(theta[i][j] == "-" && minTheta >= resultMatrix[i][j] && resultMatrix[i][j] != 0){
                                        if(minTheta == resultMatrix[i][j]){
                                            if(cost >= costMatrix[i][j]){
                                                cost = costMatrix[i][j];
                                                minTheta = resultMatrix[i][j];
                                                minThetaI = i;
                                                minThetaJ = j;
                                            }
                                        }
                                        else{
                                            cost = costMatrix[i][j];
                                            minTheta = resultMatrix[i][j];
                                            minThetaI = i;
                                            minThetaJ = j;
                                        }
                                    }
                                }
                            }
                            
                            for(let i = 0; i < demands; i++){
                                for(let j = 0; j < supply; j++){
                                    if(theta[i][j] == "-"){
                                        resultMatrix[i][j] -= minTheta;
                                    }
                                    else if(theta[i][j] == "+"){
                                        if(isNaN(resultMatrix[i][j])){
                                            resultMatrix[i][j] = 0;
                                        }
                                        resultMatrix[i][j] += minTheta;
                                    }
                                }
                            }
                            console.table(resultMatrix);
                            console.table(theta);
                        }
                    }
                    else{
                        console.log("Entered here 3");
                        for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                if(theta[i][j] == "-" && minTheta >= resultMatrix[i][j] && resultMatrix[i][j] != 0){
                                    if(minTheta == resultMatrix[i][j]){
                                        if(cost > costMatrix[i][j]){
                                            cost = costMatrix[i][j];
                                            minTheta = resultMatrix[i][j];
                                            minThetaI = i;
                                            minThetaJ = j;
                                        }
                                    }
                                    else{
                                        cost = costMatrix[i][j];
                                        minTheta = resultMatrix[i][j];
                                        minThetaI = i;
                                        minThetaJ = j;
                                    }
                                }
                            }
                        }
                        
                        for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                if(theta[i][j] == "-"){
                                    resultMatrix[i][j] -= minTheta;
                                }
                                else if(theta[i][j] == "+"){
                                    resultMatrix[i][j] += minTheta;
                                }
                            }
                        }
                        console.table(resultMatrix);
                        console.table(theta);
                    }
                    //
                    if(isDelta && isDeltaInNegativeTheta){
                        var minimumTheta = document.createElement("label");
                        minimumTheta.innerHTML = "Minimum theta is <b>Theta</b>";
                        optimalDiv.appendChild(minimumTheta);
                    }
                    else{
                        var minimumTheta = document.createElement("label");
                        minimumTheta.innerHTML = "Minimum theta is "+minTheta;
                        optimalDiv.appendChild(minimumTheta);
                    }
                    var revisedAllocation = document.createElement("label");
                    revisedAllocation.innerText = "Revised allocation will be:";
                    optimalDiv.appendChild(revisedAllocation);

                    var optimizationTable3 = document.createElement("table");
                    optimizationTable3.id = "optimization-table1";
                    optimizationTable3.style.margin = "3% 0 5% 0";
                    optimizationTable3.style.borderCollapse = "collapse";
                    
                    for(let i = 0; i < demands; i++){
                        var resultRow = document.createElement("tr");
                        for(let j = 0; j < supply; j++){
                            var resultCell = document.createElement("td");
                            var div1 = document.createElement("div");
                            div1.className = "top-left-value";
                            div1.innerText = costMatrix[i][j];

                            var div2 = document.createElement("div");
                            div2.className = "main-value";
                            if(resultMatrix[i][j] != 0){
                                div2.innerHTML = "<b>"+resultMatrix[i][j]+"</b>";
                                div2.style.fontSize = "35px";
                            }
                            else{
                                div2.innerText = "";
                            }
                            resultCell.appendChild(div1);
                            resultCell.appendChild(div2);
                            resultRow.appendChild(resultCell);
                        }
                        optimizationTable3.appendChild(resultRow);
                    }
                    optimalDiv.appendChild(optimizationTable3);

                    let nextFS = 0;
                    let nextFsString = "";
                    let itr = 0;
                    for(let i = 0; i < demands; i++){
                        for(let j = 0; j < supply; j++){
                            if(!isNaN(resultMatrix[i][j]) && resultMatrix[i][j] != 0){
                                let temp = (resultMatrix[i][j] * costMatrix[i][j]);
                                nextFS +=temp;
                                if(!itr){
                                    nextFsString += temp;
                                }
                                else{
                                    nextFsString += "+"+temp;
                                }
                                itr++;
                            }
                        }
                    }
                    var nextFsLabel = document.createElement("label");
                    nextFsLabel.innerText = "Next FS = "+ nextFsString+" = "+nextFS;
                    optimalDiv.appendChild(nextFsLabel);
                    
                    var nextFsLabelBR = document.createElement("br");
                    optimalDiv.appendChild(nextFsLabelBR);

                }else{
                    console.log("Not found");
                }
            }
            else{
                console.log("Got optimal answer");
                let nextFS = 0;
                let nextFsString = "";
                let itr = 0;
                for(let i = 0; i < demands; i++){
                    for(let j = 0; j < supply; j++){
                        if(!isNaN(resultMatrix[i][j]) && resultMatrix[i][j] != 0){
                            let temp = (resultMatrix[i][j] * costMatrix[i][j]);
                            nextFS +=temp;
                            if(!itr){
                                nextFsString += temp;
                            }
                            else{
                                nextFsString += "+"+temp;
                            }
                            itr++;
                        }
                    }
                }
                var br5 = document.createElement("br");
                optimalDiv.appendChild(br5);

                var optimalSolutionLabel = document.createElement("label");
                optimalSolutionLabel.innerText = "Optimal Solution = "+ nextFsString+" = "+nextFS;
                optimalSolutionLabel.style.color = "red";
                optimalSolutionLabel.style.fontWeight = "bold";
                optimalDiv.appendChild(optimalSolutionLabel);
                break optimal;
            }
        }

        //degenerate
        else if(ifDegeneracy+1 == (demands + supply - 1)){
            console.log("Entered degenerate");
            if(step == 1){
                previousMinCost = [];
                while(ifDegeneracy != (demands + supply - 1)){
                    console.log("In while loop");
                    minCost = Infinity;
                    let minCostI, minCostJ;

                    for(let i = 0; i < demands; i++){
                        for(let j = 0; j < supply; j++){
                            if(resultMatrix[i][j] == 0 && minCost >= costMatrix[i][j]){
                                let tempI = NaN, tempJ = NaN;
                                for (const [tempRow, tempColumn] of previousMinCost){
                                    if(tempRow == i && tempColumn == j){
                                        tempI = i;
                                        tempJ = j;
                                    }
                                }
                                if(isNaN(tempI) && isNaN(tempJ)){
                                    minCost = costMatrix[i][j];
                                    minCostI = i;
                                    minCostJ = j;
                                }
                            }
                        }
                    }

                    resultMatrix[minCostI][minCostJ] = "Delta";
                    isOptimal = true;
                    let theta = [];
                    ifDegeneracy = 0;
                    for(let i = 0; i < demands; i++){
                        for(let j = 0; j < supply; j++){
                            if(resultMatrix[i][j] != 0){
                                ifDegeneracy++;
                            }
                        }
                    }

                    [dotMatrix, isOptimal, entryI, entryJ, theta, visited] = dMatrix(ifDegeneracy, optimalDiv);
                    if(!isNaN(entryI) && !isNaN(entryJ)){
                        console.log(entryI, entryJ);
                        console.table(theta);
                        theta[entryI][entryJ] = "+";
                        visited[entryI][entryJ] = true;
                        
                        let initialIndices = possible(entryI, entryJ);
                        sourceI = entryI;
                        sourceJ = entryJ;

                        let found;
                        indices: for (const [row, column] of initialIndices){
                            if(isNaN(dotMatrix[row][column])){
                                theta[row][column] = "-";
                            }
                            let initialPlus = 0;
                            let initialMinius = 0;
                            for(let i = 0; i < demands; i++){
                                    for(let j = 0; j < supply; j++){
                                        if(theta[i][j] == "+"){
                                            initialPlus++;
                                        }
                                        if(theta[i][j] == "-"){
                                            initialMinius++;
                                        }
                                    }
                            }
                            //console.log("Initial Theta", theta);
                            count = 0;
                            [found, theta, loop] = route(entryI, entryJ, row, column, visited, dotMatrix, theta, initialPlus, initialMinius, loop);
                            if(found){
                                resultMatrix[minCostI][minCostJ] = 0;
                                loop.push([entryI, entryJ]);
                                console.log(loop);
                                break indices;
                            }
                            else{
                                while (loop.length > 0) {
                                    const poppedElement = loop.pop();
                                }
                                for(let i = 0; i < demands; i++){
                                    for(let j = 0; j < supply; j++){
                                        theta[i][j] = 0;
                                    }
                                }
                                theta[entryI][entryJ] = "+";
                            }
                        }
                        console.log("Delta", resultMatrix[minCostI][minCostJ]);
                        if(resultMatrix[minCostI][minCostJ] != "Delta"){
                            previousMinCost.push([minCostI, minCostJ]);
                        }
                        ifDegeneracy = 0;
                        for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                if(resultMatrix[i][j] != 0){
                                    ifDegeneracy++;
                                }
                            }
                        }
                    }
                    else{
                        console.log("Solution found");
                        break optimal;
                    }
                }
            }
            else{
                resultMatrix[minThetaI][minThetaJ] = "Delta";
                console.log("Degenerecy occured", resultMatrix[minThetaI][minThetaJ], minThetaI, minThetaJ);
                pre = step;
                step--;

                var DegenerateBR = document.createElement("br");
                optimalDiv.appendChild(DegenerateBR);

                var deltaAdded = document.createElement("label");
                deltaAdded.innerText = "But allocation is less (m+n-1), we add Delta to ("+Number(minThetaI+1)+", "+Number(minThetaJ+1)+")";
                optimalDiv.appendChild(deltaAdded);

                var revisedAllocation = document.createElement("label");
                revisedAllocation.innerText = "Revised allocation will be:";
                optimalDiv.appendChild(revisedAllocation);
                
                var optimizationTable5 = document.createElement("table");
                    optimizationTable5.id = "optimization-table1";
                    optimizationTable5.style.margin = "3% 0 5% 0";
                    optimizationTable5.style.borderCollapse = "collapse";
                    
                    for(let i = 0; i < demands; i++){
                        var resultRow = document.createElement("tr");
                        for(let j = 0; j < supply; j++){
                            var resultCell = document.createElement("td");
                            var div1 = document.createElement("div");
                            div1.className = "top-left-value";
                            div1.innerText = costMatrix[i][j];

                            var div2 = document.createElement("div");
                            div2.className = "main-value";
                            if(resultMatrix[i][j] != 0){
                                div2.innerHTML = "<b>"+resultMatrix[i][j]+"</b>";
                                div2.style.fontSize = "35px";
                            }
                            else{
                                div2.innerText = "";
                            }
                            resultCell.appendChild(div1);
                            resultCell.appendChild(div2);
                            resultRow.appendChild(resultCell);
                        }
                        optimizationTable5.appendChild(resultRow);
                    }
                    optimalDiv.appendChild(optimizationTable5);
            }
        }

        //error
        else{
            var revisedAllocation1 = document.createElement("label");
            revisedAllocation1.innerText = "Since number of allocation is not one less than (m+n-1), we are not handling that kind of problem problem";
            revisedAllocation1.style.color = "red";
            optimalDiv.appendChild(revisedAllocation1);
            break optimal;
        }
    }
    var ibfsDiv = document.getElementById("ibfs");
    ibfsDiv.appendChild(optimalDiv);
}

function dMatrix(ifDegeneracy, optimalDiv){
    let v = [];
    let u = [];
    let d = [];
    let dotMatrix = [];
    let isOptimal = true;
    for(let i = 0; i < demands; i++){
        dotMatrix[i] = [];
        u[i] = NaN;
        for(let j = 0; j < supply; j++){
            if(resultMatrix[i][j] == 0){
                dotMatrix[i][j] = 0;
            }
            else{
                dotMatrix[i][j] = "dot";
            }
            v[j] = NaN;
        }
    }
    //calculating initial u
    console.table(dotMatrix);
    let isDelta = false;
    for(let i = 0; i < demands; i++){
        for(let j = 0; j < supply; j++){
            if(isNaN(resultMatrix[i][j])){
                isDelta = true;
            }
        }
    }

    outerLoop: for(let i = 0; i < demands; i++){
            let present = 0;
            let previousJ;
            let previousJDelta = false;
            for(let j = 0; j <supply; j++){
                if(isDelta){
                    if(isNaN(dotMatrix[i][j])){
                        if(present){
                            if(previousJDelta){
                                u[i] = 0;
                                v[j] = costMatrix[i][j] - u[i];
                                v[previousJ] = costMatrix[i][previousJ] - u[i];
                                ifDegeneracy = ifDegeneracy - 2;
                                break outerLoop;
                            }
                            else if(isNaN(resultMatrix[i][j])){
                                u[i] = 0;
                                v[j] = costMatrix[i][j] - u[i];
                                v[previousJ] = costMatrix[i][previousJ] - u[i];
                                ifDegeneracy = ifDegeneracy - 2;
                                break outerLoop;
                            }
                        }
                        else{
                            if(isNaN(resultMatrix[i][j])){
                                previousJDelta = true;
                            }
                            present++;
                            previousJ = j;
                        }
                    }
                }
                else{
                    if(isNaN(dotMatrix[i][j])){
                        if(present){
                            u[i] = 0;
                            v[j] = costMatrix[i][j] - u[i];
                            v[previousJ] = costMatrix[i][previousJ] - u[i];
                            ifDegeneracy = ifDegeneracy - 2;
                            break outerLoop;
                        }
                        else{
                            present++;
                            previousJ = j;
                        }
                    }
                }
            }
        }
        //CALCULATING U AND V MATRIX
        while(ifDegeneracy != 0){
            for(let i = 0; i < demands; i++){
                for(let j = 0; j < supply; j++){
                    if(!(isNaN(u[i]) && isNaN(v[j])) && isNaN(dotMatrix[i][j])){
                        if(isNaN(u[i])){
                            u[i] = costMatrix[i][j] - v[j];
                            ifDegeneracy--;
                        }
                        else if(isNaN(v[j])){
                            v[j] = costMatrix[i][j] - u[i];
                            ifDegeneracy--;
                        }
                    }
                }
            }
        }
    console.table(u); 
    console.table(v); 
    console.table(dotMatrix);         
    //FINDING D MATRIX WHERE D[I][J] = C[I][J] - (U[I] + V[J])
    let largNegativeEntry = 0;
    let theta = [];
    let entryI, entryJ;
    let visited = [];
    for(let i = 0; i < demands; i++){
        d[i] = [];
        theta[i] = [];
        visited[i] = [];
        for(let j = 0; j < supply; j++){
            theta[i][j] = 0;
            visited[i][j] = false;
            d[i][j] = !(isNaN(dotMatrix[i][j])) ? costMatrix[i][j] - (u[i] + v[j]) : "dot";
            if(d[i][j] < 0){
                isOptimal = false;
                if(largNegativeEntry > d[i][j]){
                    largNegativeEntry = d[i][j];
                    entryI = i;
                    entryJ = j;
                }
            }
        }
    }
    console.table(d);
    var optimizationTable1 = document.createElement("table");
            optimizationTable1.id = "optimization-table1";
            optimizationTable1.style.margin = "3% 0 5% 0";
            optimizationTable1.style.borderCollapse = "collapse";
            
            for(let i = 0; i <= demands+1; i++){
                var resultRow = document.createElement("tr");
                for(let j = 0; j <= supply+1; j++){
                    if(i == 0 && j < supply+1){
                        var resultCell = document.createElement("th");
                        resultCell.className = "noborder";
                    }
                    else if(i==0 && j==supply+1){
                        var resultCell = document.createElement("th");
                        var tempDiv = document.createElement("div");
                        tempDiv.style.fontSize = "10px";
                        tempDiv.style.display = "inline";
                        tempDiv.innerText = "j";
                        resultCell.innerText = "U";
                        resultCell.appendChild(tempDiv);
                        resultCell.className = "noborder";
                    }
                    else if(j == 0 && i <demands+1){
                        var resultCell = document.createElement("td");
                        resultCell.className = "noborder";
                    }
                    else if( j == 0 && i == demands+1){
                        var resultCell = document.createElement("td");
                        var tempDiv = document.createElement("div");
                        tempDiv.style.fontSize = "10px";
                        tempDiv.style.display = "inline";
                        tempDiv.innerText = "j";
                        resultCell.innerText = "V";
                        resultCell.appendChild(tempDiv);
                        resultCell.className = "noborder";
                    }
                    else if(i == demands+1 && j < supply+1){
                        var resultCell = document.createElement("td");
                        resultCell.innerText = v[j-1];
                        resultCell.className = "noborder";
                    }
                    else if(j == supply+1 && i < demands+1){
                        var resultCell = document.createElement("td");
                        resultCell.innerText = u[i-1];
                        resultCell.className = "noborder";
                    }
                    else if(i==demands+1 && j == supply+1){
                        var resultCell = document.createElement("td");
                        resultCell.className = "noborder";
                    }
                    else{
                        var resultCell = document.createElement("td");
                        var div1 = document.createElement("div");
                        div1.className = "top-left-value";
                        div1.innerText = costMatrix[i-1][j-1];

                        var div2 = document.createElement("div");
                        div2.className = "main-value";
                        if(isNaN(dotMatrix[i-1][j-1])){
                            div2.innerHTML = "<b>.</b>";
                            div2.style.fontSize = "35px";
                        }
                        else{
                            div2.innerText = "";
                        }
                        resultCell.appendChild(div1);
                        resultCell.appendChild(div2);
                    }
                    resultRow.appendChild(resultCell);
                }
                optimizationTable1.appendChild(resultRow);
            }
            optimalDiv.appendChild(optimizationTable1);

            var dj = document.createElement("label");
            dj.innerText = "For the cell evaluation matrix, calculating d";
            var tempDj = document.createElement("div");
            tempDj.style.fontSize = "14px";
            tempDj.style.display = "inline";
            tempDj.innerText = "ij";
            dj.appendChild(tempDj);

            optimalDiv.appendChild(dj);

            var optimizationTable2 = document.createElement("table");
            optimizationTable2.id = "optimization-table1";
            optimizationTable2.style.margin = "0% 0 5% 0";
            optimizationTable2.style.borderCollapse = "collapse";
            
            for(let i = 0; i <= demands+1; i++){
                var resultRow = document.createElement("tr");
                for(let j = 0; j <= supply+1; j++){
                    if(i == 0 && j < supply+1){
                        var resultCell = document.createElement("th");
                        resultCell.className = "noborder";
                    }
                    else if(i==0 && j==supply+1){
                        var resultCell = document.createElement("th");
                        var tempDiv = document.createElement("div");
                        tempDiv.style.fontSize = "10px";
                        tempDiv.style.display = "inline";
                        tempDiv.innerText = "j";
                        resultCell.innerText = "U";
                        resultCell.appendChild(tempDiv);
                        resultCell.className = "noborder";
                    }
                    else if(j == 0 && i <demands+1){
                        var resultCell = document.createElement("td");
                        resultCell.className = "noborder";
                    }
                    else if( j == 0 && i == demands+1){
                        var resultCell = document.createElement("td");
                        var tempDiv = document.createElement("div");
                        tempDiv.style.fontSize = "10px";
                        tempDiv.style.display = "inline";
                        tempDiv.innerText = "j";
                        resultCell.innerText = "V";
                        resultCell.appendChild(tempDiv);
                        resultCell.className = "noborder";
                    }
                    else if(i == demands+1 && j < supply+1){
                        var resultCell = document.createElement("td");
                        resultCell.innerText = v[j-1];
                        resultCell.className = "noborder";
                    }
                    else if(j == supply+1 && i < demands+1){
                        var resultCell = document.createElement("td");
                        resultCell.innerText = u[i-1];
                        resultCell.className = "noborder";
                    }
                    else if(i==demands+1 && j == supply+1){
                        var resultCell = document.createElement("td");
                        resultCell.className = "noborder";
                    }
                    else{
                        var resultCell = document.createElement("td");
                        var div1 = document.createElement("div");
                        div1.className = "top-left-value";
                        div1.innerText = costMatrix[i-1][j-1];

                        var div2 = document.createElement("div");
                        div2.className = "main-value";
                        if(isNaN(dotMatrix[i-1][j-1])){
                            div2.innerHTML = "<b>.</b>";
                            div2.style.fontSize = "35px";
                        }
                        else{
                            div2.innerText = d[i-1][j-1];
                            div2.style.color = "blue";
                            div2.style.fontWeight = "bold";
                        }
                        resultCell.appendChild(div1);
                        resultCell.appendChild(div2);
                    }
                    resultRow.appendChild(resultCell);
                }
                optimizationTable2.appendChild(resultRow);
            }
            optimalDiv.appendChild(optimizationTable2);
    return [dotMatrix, isOptimal, entryI, entryJ, theta, visited];
}

let count;
function route(previousi, previousj, presentI, presentJ, visited, dotMatrix, theta, initialPlus, initialMinius, loop){
    //console.log("Theta", theta);
    let pointI, pointJ;
    while(true){
        if(isNaN(dotMatrix[presentI][presentJ]) && !visited[presentI][presentJ]){
            count++;
            pointI = presentI;
            pointJ = presentJ;
            let turnIndices = possible(presentI, presentJ);
            console.log(turnIndices);
            let found;
            visited[pointI][pointJ] = true;
            for (const [turnI, turnJ] of turnIndices){
                if(!(previousi == turnI && previousj == turnJ)){
                    let turn = true;
                    if(((previousi == turnI && previousi == presentI) || (previousj == turnJ && previousj == presentJ))){
                        count--;
                        turn = false;
                    }
                    [found, theta, loop] = route(pointI, pointJ, turnI, turnJ, visited, dotMatrix, theta, initialPlus, initialMinius, loop);
                    if(found){
                        let turn = true;  
                        if((previousi == turnI && previousi == presentI) || (previousj == turnJ && previousj == presentJ)){
                            turn = false;
                        }
                        let plusCount = 0;
                        let minusCount = 0;
                        for(let i = 0; i < demands; i++){
                            for(let j = 0; j < supply; j++){
                                if(theta[i][j] == "+"){
                                    plusCount++;
                                }
                                if(theta[i][j] == "-"){
                                    minusCount++;
                                }
                            }
                        }
                        if(initialPlus == 1 && initialMinius == 0){
                            if(plusCount == 1 && minusCount == 0 && theta[pointI][pointJ] == 0 && isNaN(dotMatrix[pointI][pointJ]) && turn){
                            theta[pointI][pointJ] = "-";
                            loop.push([pointI, pointJ]);
                            }
                            if(plusCount == minusCount && theta[pointI][pointJ] == 0 && isNaN(dotMatrix[pointI][pointJ]) && turn){
                                theta[pointI][pointJ] = "+";
                                loop.push([pointI, pointJ]);
                            }
                            else if(plusCount != minusCount && theta[pointI][pointJ] == 0 && isNaN(dotMatrix[pointI][pointJ]) && turn){
                                theta[pointI][pointJ] = "-";
                                loop.push([pointI, pointJ]);
                            }
                        }
                        else{
                            if(plusCount == minusCount && theta[pointI][pointJ] == 0 && isNaN(dotMatrix[pointI][pointJ]) && turn){
                                theta[pointI][pointJ] = "-";
                                loop.push([pointI, pointJ]);
                            }
                            else if(plusCount != minusCount && theta[pointI][pointJ] == 0 && isNaN(dotMatrix[pointI][pointJ]) && turn){
                                theta[pointI][pointJ] = "+";
                                loop.push([pointI, pointJ]);
                            } 
                        }
                        
                        return [true, theta, loop];
                    }
                    else{
                        if(!turn){
                            count++;
                        }
                    }
                }
            }
            visited[pointI][pointJ] = false;
            count--;
            return [false, theta, loop];
        }
        if(sourceI == presentI && sourceJ == presentJ && count%2 != 0 && count>2){
            return [true, theta, loop];
        }
        if(previousi > presentI && previousj == presentJ && presentI > 0){
            previousi = presentI;
            presentI--;
        }
        else if(previousi < presentI && previousj == presentJ && presentI < demands-1){
            previousi = presentI;
            presentI++;
        }
        else if(previousi == presentI && previousj > presentJ && presentJ > 0){
            previousj = presentJ;
            presentJ--;
        }
        else if(previousi == presentI && previousj < presentJ && presentJ < supply-1){
            previousj = presentJ;
            presentJ++;
        }
        else{
            return [false, theta, loop];
        }
    }
}

function possible(presentI, presentJ){
    let indices = [];
    if(presentI == 0 && presentJ == 0){
        indices.push([presentI+1, presentJ]);
        indices.push([presentI, presentJ+1]);
    } 
    
    else if(presentI > 0 && presentI < demands-1 && presentJ == 0){
        indices.push([presentI+1, presentJ]);
        indices.push([presentI, presentJ+1]);
        indices.push([presentI-1, presentJ]);
    }

    else if(presentI == 0 && presentJ > 0 && presentJ < supply-1){
        indices.push([presentI+1, presentJ]);
        indices.push([presentI, presentJ+1]);
        indices.push([presentI, presentJ-1]);
    }

    else if(presentI == demands-1 && presentJ > 0 && presentJ < supply-1){
        indices.push([presentI-1, presentJ]);
        indices.push([presentI, presentJ+1]);
        indices.push([presentI, presentJ-1]);
    }

    else if(presentI >0 && presentI < demands-1 && presentJ == supply-1){
        indices.push([presentI+1, presentJ]);
        indices.push([presentI, presentJ-1]);
        indices.push([presentI-1, presentJ]);
    }

    else if(presentI == demands-1 && presentJ == 0){
        indices.push([presentI-1, presentJ]);
        indices.push([presentI, presentJ+1]);
    }

    else if(presentI == 0 && presentJ == supply-1){
        indices.push([presentI, presentJ-1]);
        indices.push([presentI+1, presentJ]);
    }

    else if(presentI == demands-1 && presentJ == supply-1){
        indices.push([presentI-1, presentJ]);
        indices.push([presentI, presentJ-1]);
    }

    else if(presentI > 0 && presentI < demands-1 && presentJ >0 && presentJ < supply-1){
        indices.push([presentI+1, presentJ]);
        indices.push([presentI, presentJ+1]);
        indices.push([presentI, presentJ-1]);
        indices.push([presentI-1, presentJ]);
    }
    return indices;
    }

function end(){
    var proceedDuplicate = document.querySelector("#proceed");

    if (proceedDuplicate){
        proceedDuplicate.parentNode.removeChild(proceedDuplicate);
    }
}