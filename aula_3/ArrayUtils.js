var util ={
   
    isEmpty: function(array){
        if (array.length == 0){
            return true;
        }
        else {
            return false;
        }
    },

    maxArray: function(array){
        var max = array[0];
        for (var i = 1; i < array.length; i++){
            if (max < array[i]){
                max = array[i];
            } 
        }
    return max;
    },

    minArray: function(array){
        var min = array[0];
        for (var i = 1; i < array.length; i++){
            if (min > array[i]){
                min = array[i];
            } 
        }
    return min;
    },

    mediaArray: function(array){
        var media = 0;
        for (var i = 0; i < array.length; i++){
            media = media + array[i];
        }
        media = media / array.length;
    return media;
    },

    indexOf: function(array, value){
        for (var i=0; i < array.length; i++){
            if (array[i]==value){
                var indice = i;
            }
        }
    return indice;
    },

    subArray: function(array, startIndex, endIndex){
        var array2 = [];
        for (var i=startIndex; i <= endIndex; i++){
            array2.push(array[i]);
            }
        
        return array2;
    },

    isSameLength: function(array1,array2){
        if(array1.length==array2.length){
            return true;
        }
        else{
            return false;
        }
    },

    revArray: function(array){
        var reverseArray = [];
        for (var i = array.length-1; i>=0; i--){
            reverseArray.push(array[i]);
        }
        return reverseArray;
    },

    arraySwap: function(array, index1, index2){
        var arraySwaped = [];
        for (var i=0; i<array.length; i++){

            if(i==index1){
                arraySwaped.push(array[index2]);
            }
            else if (i == index2){
                arraySwaped.push(array[index1]);
            }
            else
                arraySwaped.push(array[i]);
        }
    }

}

module.exports = util;