class Food
{
    constructor()
    {
        //Create Name Bar, Feed Button & Add Food Button
        this.feedButton = createButton("Feed Atlas!");
        this.addFoodButton = createButton("Add Food");

        this.feedButton.position(400, 95);
        this.addFoodButton.position(500, 95);
    }

    //Fetch Data from Database
    readData()
    {
       foodStockRef = database.ref("Origin/availFood");
       foodStockRef.on('value', function(data)
       {
           foodS = data.val();
       })

       feedTimeRef = database.ref("Origin/latestFeed");
       feedTimeRef.on('value', function(data)
        {
            lastSnack = data.val();
        })

        gameStateRef = database.ref("Origin/state");
        gameStateRef.on('value', function(data)
        {
            gameState = data.val();
        })
    }

    //Update Data in Databse
    updateData()
    {
        this.feedButton.mousePressed(() =>
        {
            if(foodS <= 0)
            {
                foodS = 0
            } else 
            {
                foodS = foodS - 1;
            }
            database.ref('Origin').update({availFood:foodS, latestFeed: hour(), state:"Hungry"});
            dog.addImage(dogHappy);
        })

        this.addFoodButton.mousePressed(() =>
        {
            if(foodS < 30)
            {
                foodS = foodS + 1;
            }
            database.ref('Origin').update({availFood:foodS});
        })
        
        //Update States in Database with respect to Last Fed Time
        currentTime = hour();
        if(currentTime==(lastSnack+1))
        {
            this.update("Playing");
            background(GardenImg, 550, 500);
        } else if(currentTime == (lastSnack+2))
        {
            this.update("Sleeping");
            background(BedRoomImg, 550, 500);
        } else if (currentTime > (lastSnack+2) && currentTime <= (lastSnack+4))
        {
            this.update("Bathing");
            background(WashRoomImg, 550, 500);
        } else
        {
            this.update("Hungry");
            this.displayBottles();
        }
    }

    //If the State is Hungry
    ifHungry()
    {
        if(gameState != "Hungry")
        {
            this.feedButton.hide();
            this.addFoodButton.hide();
            dog.visible = false;
        } else
        {
            this.feedButton.show();
            this.addFoodButton.show();
            dog.addImage(dogNeutral);
            dog.visible = true;
        }
    }

    //Update GameStates
    update(data)
    {
        database.ref('Origin').update({state:data})
    }

    //Display Milk Bottles with respect to Available Food
    displayBottles()
    {
        var xPosition = 80, yPosition = 100;
        
        imageMode(CENTER);

        if(foodS != 0)
        {
            for(var i = 0; i < foodS; i++)
            {
                if(i % 10 == 0)
                {
                    xPosition = 115;
                    yPosition = yPosition + 50;
                }
                image(milkBottleImg, xPosition, yPosition, 50, 50);
                xPosition = xPosition + 30;
            }
        }
    }

    //Show the Latest Feed Time
    displayFedTime()
    {
        fill(255, 255, 254);
        textSize(15);
    
        if(lastSnack >= 12)
        {
            text("Last Feed : " + lastSnack%12 + " PM", 50, 575);
        } else if(lastSnack   == 0)
        {
            text("Last Feed : 12 AM", 350, 30);
        } else
        {
            text("Last Feed :" + lastSnack   + " AM", 50, 575);
        }
    }
    

    //Execute all Functions
    executeFunctions()
    {
        this.readData();
        this.updateData();
        this.displayFedTime();
        this.ifHungry();
    }
}