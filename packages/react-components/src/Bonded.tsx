// Copyright 2017-2022 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import type { BN } from '@polkadot/util';

import React from 'react';

import { Bonded } from '@polkadot/react-query';

import { renderProvided } from './Balance';
import { useTranslation } from './translate';

export interface Props {
  bonded?: BN | BN[];
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
  withLabel?: boolean;
  isDarwiniaPower?: boolean;
}

function BondedDisplay (props: Props): React.ReactElement<Props> | null {
  const { bonded, className = '', label, params, isDarwiniaPower } = props;
  const { t } = useTranslation();

  if (!params) {
    return null;
  }

  return bonded
    ? <>{renderProvided({ className, label, value: bonded, isDarwiniaPower, powerUnit: t('power', 'power') })}</>
    : (
      <Bonded
        className={`ui--Bonded ${className}`}
        label={label}
        params={params}
      />
    );
}

export default React.memo(BondedDisplay);
