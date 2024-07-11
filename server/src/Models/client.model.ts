import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SensitiveData } from './sensitiveData';
import { User } from './user.model';
// import { CounterService } from '../services/counter.ervice';

export enum ReportType {
  Monthly = 'מדווח חודשי',
  BiMonthly = 'דו חודשי',
  SemiAnnual = 'חצי שנתי',
  NotReporting = 'לא מדווח',
}
@Schema()
export class Client extends Document {
  @Prop()
  companyName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  contactPersonName: string;

  @Prop()
  tz: string;

  @Prop()
  spouseName: string;

  @Prop()
  spouseTZ: string;

  @Prop()
  phone: string;

  @Prop()
  whatsapp: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  encryptedPasswords: SensitiveData[];

  @Prop()
  comments: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  lastUserUpdate: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignTo: User[];

  @Prop({ default:'1000', unique: true, })
  clientID: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  isEmploysWorkers: boolean;

  @Prop()
  isWorkData: boolean;

  @Prop()
  incomeTaxFileNumber: string;

  @Prop()
  incomeTaxDeductions_registerID: string;

  @Prop()
  VATFileNumber: string;

  @Prop()
  reports: ReportType;

  @Prop()
  isStatisticsData: boolean;

  @Prop()
  referrerName: string;

  @Prop()
  joinDate: Date;

  @Prop()
  isAccounter: boolean;

  @Prop()
  isOpenAccountWithUs: boolean;
}

// ClientSchema.pre<Client>('save', async function (next) {
//   if (this.isNew) {
//     const counter = await CounterModel.findOneAndUpdate(
//       { collectionName: 'Client' },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     this.clientID = (1000 + counter.seq).toString(); // התחלת 1000 והמשך במספרים הסידוריים
//   }
//   next();
// });



export const ClientModel = SchemaFactory.createForClass(Client);
