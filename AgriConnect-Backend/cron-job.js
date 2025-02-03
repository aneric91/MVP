const cron = require('node-cron');
const User = require('./models/User'); // modèle Mongoose

// Cette tâche s'exécute quotidiennement à minuit.
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();

    // Trouver les utilisateurs dont le prochain paiement est dû ou dépassé et dont le paiement n'est pas encore marqué comme pending.
    const usersDueForPayment = await User.find({
      nextPaymentDue: { $lte: today },
      paymentPending: false,
      subscriptionActive: true  // On peut vérifier aussi si l'utilisateur est abonné
    });

    for (const user of usersDueForPayment) {
      user.paymentPending = true;
      // Vous pouvez également enregistrer la date à laquelle la notification a été déclenchée, si besoin.
      await user.save();
    }

    console.log(`Cron job: Updated paymentPending status for ${usersDueForPayment.length} user(s) at ${today.toLocaleString()}`);
  } catch (error) {
    console.error('Error in subscription cron job:', error);
  }
});
