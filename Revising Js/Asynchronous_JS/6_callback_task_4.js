const orderPackage = (orderId, callback) => {
  if (!orderId) return callback(new Error("Invalid order ID"));
  console.log(`Order ${orderId} placed`);
  callback(null, orderId);
};

const deliverPackage = (orderId, callback) => {
  setTimeout(() => {
    console.log(`Order ${orderId} delivered`);
    callback(null, orderId);
  }, 2000);
};

const notifyCustomer = (orderId, callback) => {
  setTimeout(() => {
    console.log(`Customer notified for order ${orderId}`);
    callback(null, orderId);
  }, 1000);
};

// Chaining callbacks
orderPackage(101, (err, orderId) => {
  if (err) return console.error(err);
  deliverPackage(orderId, (err, orderId) => {
    if (err) return console.error(err);
    notifyCustomer(orderId, (err) => {
      if (err) return console.error(err);
      console.log("All steps completed successfully!");
    });
  });
});