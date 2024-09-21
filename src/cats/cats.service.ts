import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto,user: UserActiveInterface) {
    /* if(createCatDto.breed){ */
      const breed = await this.breedRepository.findOneBy({
        name: createCatDto.breed
      });
  
      if(!breed){
        throw new BadRequestException('Breed not found');
      }

    /* } */
    /* const cat = this.catRepository.create(createCatDto); */
    return await this.catRepository.save({
        ...createCatDto,
        breed:breed,
        userEmail:user.email 
    });
  }
  //buscar todos mediante el user logged
  //y por alguna razon q desconosco, si el user es admin que pueda ver todos los datos 
  async findAll() {
    return await this.catRepository.find();
  }


  //verificar que si el gato no existe tirar un 404 y si no es admin y su email del registrado es distinto al mail del que registro al gato tire un no autorizado
  //y bueno, aplicar solid en la segunda validacion
  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOneBy({id});

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    let breed;
    if (updateCatDto.breed) {
      breed = await this.breedRepository.findOneBy({
        name: updateCatDto.breed,
      });

      if (!breed) {
        throw new BadRequestException('Breed not found');
      }
    }
    return await this.catRepository.save({
      ...cat,
      ...updateCatDto,
      breed,
    });
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id});
  }
}
