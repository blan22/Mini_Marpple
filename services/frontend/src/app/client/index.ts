import '../../shared/styles/reset.scss';
import '../../components/unit/layout/layout.module.scss';
import '../../components/unit/header/header.module.scss';
import { hydrate } from '@rune-ts/server';

import { ClientRouter } from '../router';

hydrate(ClientRouter);
