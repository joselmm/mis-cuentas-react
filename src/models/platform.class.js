import { DateTime } from 'luxon';
import '../constants/luxon.config';
import generateId from '../constants/generateID';
import { setEmptyHour } from '../constants/time.functions';
import PAYMENT_STATUSES from '../constants/paymentStatuses.enum';
const defaultLastBillingDate = setEmptyHour(DateTime.now()).toString();
const defaultNextBillingDate = defaultLastBillingDate.toString();

class Platform {
  constructor({
    id,
    platformName,
    withCredentials,
    active,
    clientId,
    email,
    password,
    emailPassword,
    paymentMethod,
    additionalInfo,
    lastBillingDate,
    nextBillingDate,
    price,
    parcialPayment,
    paymentStatus,
    usageTime,
  } = {}) {
    this.id = id || generateId(30);
    this.platformName = platformName || '';
    this.withCredentials =
      withCredentials !== undefined ? withCredentials : true;
    this.active = active !== undefined ? active : true;
    this.clientId = clientId || '';
    this.email = email || '';
    this.password = password || '';
    this.emailPassword = emailPassword || '';
    this.lastBillingDate = lastBillingDate || defaultLastBillingDate;
    this.usageTime = usageTime || 0;
    this.nextBillingDate = defaultNextBillingDate || nextBillingDate;
    this.paymentMethod = paymentMethod || '';
    this.price = price || 0;
    this.paymentStatus = paymentStatus || '';
    this.parcialPayment = parcialPayment || 0;
    this.additionalInfo = additionalInfo || '';
  }
}

export default Platform;
