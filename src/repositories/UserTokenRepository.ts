import { AppDataSource } from '../data-source';
import { UserTokens } from '../models/UserTokens';

export const userTokenRepository = AppDataSource.getRepository(UserTokens);
