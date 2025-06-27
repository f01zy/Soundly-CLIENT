import { $api } from '@/http';
import { IMusic } from '@/interfaces/music.interface';

export const getAllMusic = async () => await $api.get<Array<IMusic>>("/music").then(res => res.data)