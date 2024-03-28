import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly notesService: NotesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const resourceId = request.params.id;
    if (!resourceId) {
      return false;
    }

    const resource = await this.notesService.findOne(resourceId);
    if (!resource) {
      console.log('Resource not found');
      return false;
    }
    return resource.ownerId === request.user.sub;
  }
}
