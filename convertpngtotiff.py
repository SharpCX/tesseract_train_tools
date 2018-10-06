#!/usr/bin/env python

import sys

from PIL import Image
img = Image.open(sys.argv[1])
img.save(sys.argv[1]+'.tiff')