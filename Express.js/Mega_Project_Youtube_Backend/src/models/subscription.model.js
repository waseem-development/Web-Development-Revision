import mongoose, { Schema } from "mongoose";

// ==========================================
// WHAT IS A SUBSCRIPTION DOCUMENT?
// ==========================================
// Each document in this collection represents ONE subscription relationship
// Think of it as a single row in a "who follows who" table
//
// EVERY TIME someone subscribes → a NEW MongoDB document is created
//
// Real world example:
// ┌────────────────────────────────────────────────────────────┐
// │  ACTION                              │  DOCUMENTS CREATED  │
// ├────────────────────────────────────────────────────────────┤
// │  Alice subscribes to MrBeast         │  1 new document     │
// │  Bob subscribes to MrBeast           │  1 new document     │
// │  Bob subscribes to PewDiePie         │  1 new document     │
// │  Charlie subscribes to MrBeast       │  1 new document     │
// │  Charlie subscribes to PewDiePie     │  1 new document     │
// │  Charlie subscribes to T-Series      │  1 new document     │
// └────────────────────────────────────────────────────────────┘
//
// RESULT: 6 actions = 6 separate MongoDB documents in the collection
//
// ==========================================
// WHAT THE COLLECTION LOOKS LIKE IN MONGODB
// ==========================================
//
// Document 1: { subscriber: Alice,   channel: MrBeast   , createdAt: ... }
// Document 2: { subscriber: Bob,     channel: MrBeast   , createdAt: ... }
// Document 3: { subscriber: Bob,     channel: PewDiePie , createdAt: ... }
// Document 4: { subscriber: Charlie, channel: MrBeast   , createdAt: ... }
// Document 5: { subscriber: Charlie, channel: PewDiePie , createdAt: ... }
// Document 6: { subscriber: Charlie, channel: T-Series  , createdAt: ... }
//
// ==========================================
// NOW LET'S RUN SOME QUERIES ON THIS DATA
// ==========================================
//
// QUERY: "How many subscribers does MrBeast have?"
// → Subscription.find({ channel: MrBeast._id })
// → Returns Document 1, 2, 4  (all docs where channel = MrBeast)
// → Answer: 3 subscribers (Alice, Bob, Charlie)
//
// QUERY: "How many subscribers does PewDiePie have?"
// → Subscription.find({ channel: PewDiePie._id })
// → Returns Document 3, 5  (all docs where channel = PewDiePie)
// → Answer: 2 subscribers (Bob, Charlie)
//
// QUERY: "How many channels has Bob subscribed to?"
// → Subscription.find({ subscriber: Bob._id })
// → Returns Document 2, 3  (all docs where subscriber = Bob)
// → Answer: 2 channels (MrBeast, PewDiePie)
//
// QUERY: "Has Alice subscribed to PewDiePie?"
// → Subscription.findOne({ subscriber: Alice._id, channel: PewDiePie._id })
// → Returns null  (no such document exists)
// → Answer: No, Alice has not subscribed to PewDiePie
//
// ==========================================

const subscriptionSchema = new Schema(
  {
    subscriber: {
      // The USER who clicked the "Subscribe" button
      // i.e., the fan / follower
      //
      // From our example above:
      // Document 1 → subscriber: Alice
      // Document 2 → subscriber: Bob
      // Document 3 → subscriber: Bob    ← same Bob, different channel
      // Document 4 → subscriber: Charlie
      //
      // USE THIS FIELD TO ANSWER:
      // "Which channels has Bob subscribed to?"
      // → Subscription.find({ subscriber: Bob._id })
      // → Returns docs 2 and 3
      // → Each doc's "channel" field = MrBeast, PewDiePie
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    channel: {
      // The USER whose channel is being subscribed to
      // i.e., the creator
      //
      // From our example above:
      // Document 1 → channel: MrBeast
      // Document 2 → channel: MrBeast   ← same MrBeast, different subscriber
      // Document 3 → channel: PewDiePie
      // Document 4 → channel: MrBeast   ← MrBeast again, 3rd subscriber
      //
      // USE THIS FIELD TO ANSWER:
      // "Who has subscribed to MrBeast?"
      // → Subscription.find({ channel: MrBeast._id })
      // → Returns docs 1, 2 and 4
      // → Each doc's "subscriber" field = Alice, Bob, Charlie
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // createdAt = the exact moment they subscribed
  }
);

// ==========================================
// WHY BOTH FIELDS REFERENCE THE USER MODEL?
// ==========================================
// On YouTube, BOTH the subscriber and the channel owner are Users
// There is no separate "Channel" model
// A user IS their channel — same _id, same document
//
// MrBeast  → just a User document with millions of subscribers
// Alice    → just a User document who subscribes to others
// PewDiePie → a User who is BOTH a subscriber to others AND has his own subscribers
//
// The same person can be BOTH a subscriber and a channel simultaneously
// ==========================================

export const Subscription = mongoose.model("Subscription", subscriptionSchema);