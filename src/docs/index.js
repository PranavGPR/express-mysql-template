import pingDocs from './ping';
import restaurantDocs from './restaurant';
import customerDocs from './customer';
import adminDocs from './admin';

export default { ...pingDocs, ...adminDocs, ...restaurantDocs, ...customerDocs };
