import { db } from '../firebase';

export const handleQuery = (uid: string, symbol: string, queryType: string) => {
  const weekRef = db.collection('positions').doc(uid).collection(symbol);

  let q;
  switch (queryType) {
    case '1M':
      q = weekRef.orderBy('week', 'desc').limit(4);
      break;
    case '3M':
      q = weekRef.orderBy('week', 'desc').limit(12);
      break;
    case 'Max':
      q = weekRef.orderBy('week');
      break;
    default:
      q = weekRef.orderBy('week', 'desc').limit(1);
      break;
  }

  return q;
};
