export function buildSavingsChart(transactions: any[]) {
  return transactions.reduce((acc: any[], curr) => {
    const lastBalance = acc[acc.length - 1]?.balance || 0;

    const newBalance =
      curr.transactionType === "add"
        ? lastBalance + curr.amount
        : lastBalance - curr.amount;

    acc.push({
      date: new Date(curr.date).toLocaleDateString(),
      balance: newBalance,
    });

    return acc;
  }, []);
}
