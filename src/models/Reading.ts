import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  measure_uuid!: string;

  @Column('text')
  image!: string;

  @Column('varchar', { length: 255 }) 
  image_url!: string;

  @Column('varchar', { length: 50 })
  customer_code!: string;

  @Column('timestamp')
  measure_datetime!: Date;

  @Column('enum', { enum: ['WATER', 'GAS'] })
  measure_type!: 'WATER' | 'GAS';

  @Column('int')
  measure_value!: number;
}