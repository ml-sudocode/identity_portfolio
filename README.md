# Avengers Pocketdb

[submission](https://ethglobal.com/showcase/avengers-pocketdb-ogub2)

![image](https://user-images.githubusercontent.com/16504501/194766868-61ba1673-ac6e-440d-875f-0b78e15c1930.png)

## In Summary, What It Does

Avengers Pocketdb is a crypto-native database designed for individuals who are *privacy-conscious* & who like to keep their crypto data *organized*. 

It’s delivered as a web app, & the hardware it needs is designed to fit in your pocket - great for the *security-conscious*!

That’s it. Nothing fancy, just something useful for you.

## Visual Explainer

![image](https://user-images.githubusercontent.com/16504501/194767071-ac87a436-6746-4455-8cf4-f296470d2539.png)

![image](https://user-images.githubusercontent.com/16504501/194767089-f0bfde89-0d24-49f4-8e72-57e33e644f46.png)

![image](https://user-images.githubusercontent.com/16504501/194767099-86c144d0-4385-4262-94a3-4efbad00805c.png)

![image](https://user-images.githubusercontent.com/16504501/194767115-7f50dd5a-5d92-4381-aef4-550cabb7b606.png)ad

## A preference for privacy and the problems it create

I will tell this story from my perspective, but I believe my experience is common to a lot of people.

Some users have a preference for privacy while transacting with different parties. In transparent blockchains, privacy is achieved via pseudonymity, where people cannot tie their knowledge of who you are IRL to the transactions that they see a particular address make. 

It feels strange when I pay someone for lunch at a conference and they suddenly have info on every single tx i’ve ever made and will make. It’s embarassing letting people I work with know that I aped into some stupid NFTs… and while on work time. So, I create different addresses for different purposes. This is not the problem.

The problem arises when, in addition to protecting my privacy, I also want to be organized. I have a long spreadsheet and several text files with hundreds of entries. In each of these poor man’s database tools, I enter records of NFTs I buy, stablecoin investments into startups, staking arrangements, and much more. It’s a total mess, and don’t let me get started on notes that conflict because those files overlap in scope.

Making matters worse, I like trying out new tech and I am security conscious. So I use many devices (laptops and mobiles) and many browsers, each with their own wallet. If you’re like me, you know what I mean by not knowing exactly which wallet to use for a particular transaction :’\


## Solutions… that don’t fully meet our needs ===

Zerion and Zapper are great. At the click of a button, they show you the tokens you have at an address. But they don’t let me track things like funds sent for angel investments. They don’t let me annotate transactions like payments to friends. Or note that I used a certain address to register for this hackathon. Or tell me who knows which addresses I hold. 

That’s why I still need my spreadsheets :(

In addition, and importantly, I *really* do not like the idea of sending my data to external parties, whether it’s a wallet address or personal notes on transactions. I would prefer to log all this personal financial data on an app that only I can access.


## The Solution: Avengers Pocketdb!

Why the name? 
The Avengers is made up of many superheroes, and here it represents how we each have multiple identities: with family, frends, work, etc. Pocketdb refers to the fact that the solution fits into your pocket, in the form of a flash drive or a Raspberry Pi.

What it does
[ ] Track all your wallets and addresses: where they are loaded, what you did with them, who knows you have those addresses. You can use this for mundane things like tax reporting or to choose the best address to use for a specific payment/transaction/event based on your privacy preferences
[ ] Record and search your transactions using keywords like “angel investment,” “hackathon,” “ETH2 staking,” “burning man camp fees”
[ ] Upload contacts and mark them as knowing a specific address of mine (e.g. I invest in RamenSwap by depositing USDC into their address. I will make a note that the address from which I sent the USDC funds is doxxed to them)

Bonus (not tied to previously described pain points)
[ ] Ability to calculate what you made on a certain investment. Using tags for each investment decision (e.g. “# buy May 2022 dip in 3 chunks”), track how you’ve done for the whole investment instead of per single on-chain transaction. Returns multiple on investment and annualized return for some intellectual honesty ;)
[ ] Two options for running it depending on your travel habits and security concerns: run the app on a Raspberry Pi at home and access your database from anywhere. Or, run the app on your laptop, but keep the underlying data in an encrypted CSV file on a USB flash drive that you keep well-protected

## Setup

1. Clone this repo
2. Install dependencies
```
npm install
```
3. Run the dev server
```
npm run dev
```

## Gallery

### Design

![image](https://user-images.githubusercontent.com/16504501/194766877-5067dec6-b967-4aaf-81c7-f60fb9a07237.png)

### Transactions

![image](https://user-images.githubusercontent.com/16504501/194766888-6f40c061-6463-47eb-b5d5-460500a4b455.png)

### Actions

![image](https://user-images.githubusercontent.com/16504501/194766898-78097f56-3556-4bae-9d11-b8d2f0372620.png)

